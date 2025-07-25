import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../models/User";
import supabase from "../../lib/supabaseClient";

interface UserState {
    signUpError: string | undefined;
    signUpUser: User; //kullanıcının başta bir kullanı adı olucak ve bu kullanıcı adı eger data da varsa ve ilk kez giriş yapıyorsa şifre oluşturması istenice
    //master admin => kullanıcılar için kulllanıcı adlarını oluşturan kişi
    signInError: string | undefined;
    signInUser: User; //kullanıcı şifre ve kullanıcı adıyla giriş yap
    signOutError: string | undefined;
    signOutUser: User;
    allUSer: User[] | null;
    createdUser: User; // master adminin oluşturdu kullanıcı adı ve statu
    createdUserError: string | undefined
    user: User | null
    currentUser: any
    open: boolean
}
let userObject
const storedUser = localStorage.getItem("user");
if (storedUser) {
    userObject = JSON.parse(storedUser);
}

const initialState: UserState = {
    signUpError: undefined,
    signUpUser: {
        userName: "",
        status: ""
    },
    signInError: undefined,
    signInUser: {
        userName: "",
        status: ""
    },
    signOutError: undefined,
    signOutUser: {
        userName: "",
        status: ""
    },
    allUSer: [],
    createdUser: {
        userName: "",
        status: ""
    },
    createdUserError: undefined,
    user: {
        userName: "",
        status: ""
    },
    currentUser: userObject,
    open:false
}

// aslında bir update fonksiyonu çünkü kullanıcı adı zaten önceden oluşturuluyor.
export const signUp = createAsyncThunk<User, { userName: string, password: string, defaultPassword: string }>("user/signUp",
    async ({ userName, defaultPassword, password }) => {
        const { data: user, error } = await supabase.from("user").update({ password }).eq("userName", userName).eq("defaultPassword", defaultPassword).select().single()
        if (error) throw error.message
        return user
    })

export const signIn = createAsyncThunk<User, { userName: string; password?: string; defaultPassword?: string }>("user/signIn",
    async ({ userName, password, defaultPassword }) => {
        let query = supabase.from("user").select("userName, status").eq("userName", userName);
        if (password !== undefined) {
            query = query.eq("password", password);
        }
        if (defaultPassword !== undefined) {
            query = query.eq("defaultPassword", defaultPassword);
        }
        const { data: user, error } = await query.single();
        if (error) throw error.message;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    });

export const signOut = createAsyncThunk<User, { userName: string }>("user/signOut",
    async ({ userName }) => {
        const stored = localStorage.getItem("user");
        if (!stored) return
        const parsed = JSON.parse(stored)
        if (parsed.userName === userName) {
            localStorage.removeItem("user")
            return parsed
        } else {
            return
        }
    })

//Yapıldı
export const createUser = createAsyncThunk<User, { userName: string; status: string; defaultPassword: string }>("user/createUser",
    async ({ userName, status, defaultPassword }) => {
        const fakeEmail = `${userName}@yourapp.local`;
        const { data, error } = await supabase.auth.admin.createUser({ email: fakeEmail, password: defaultPassword, email_confirm: true, });
        if (error) throw error.message;
        const { data: userProfile, error: userTableError } = await supabase.from("user").insert([{ id: data.user.id, userName, status, isDefaultPassword: true, },]).select().single();
        if (userTableError) throw userTableError.message;
        return userProfile;
    });


export const deleteUSer = createAsyncThunk<User[] | null, { userName: string }>("user/deleteUser",
    async ({ userName }) => {
        let { data: users } = await supabase.from("user").delete().eq("userName", userName).single()
        return users
    }
)

export const getAllUser = createAsyncThunk<User[] | null>("user/getAllUser",
    async () => {
        let { data: users } = await supabase.from("user").select("*")
        return users
    }
)


export const getUser = createAsyncThunk<User | null, { userName: string }>("user/getUser",
    async ({ userName }) => {
        const { data: user } = await supabase.from("user").select("*").ilike("userName", userName).single()
        return user
    }
)

export const updateUser = createAsyncThunk<User, User>("user/updateUser",
    async (userD) => {
        const { data: user } = await supabase.from("user").update(userD).eq("id", userD.id).select().single()
        return user
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setOpen: (state) => {
            state.open = !state.open
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUpUser = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.signUpError = action.error.message
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.signInUser = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.signInError = action.error.message
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.signOutUser = action.payload;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.signOutError = action.error.message
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createdUser = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createdUserError = action.error.message
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.allUSer = action.payload;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
})


export const {setOpen} = userSlice.actions
export default userSlice.reducer