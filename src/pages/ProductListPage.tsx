import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteProduct, getProduct } from '../redux/slices/productSlice';
import { type AppDispatch, type RootState } from '../redux/store';
import { Table, Image } from 'antd';
import type { TableColumnsType } from 'antd';
import type { Product } from '../models/Product';
import { MdDeleteOutline, MdSystemUpdateAlt } from 'react-icons/md';
import Found404Page from './Found404Page';

const ProductListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);
  const getLoading = useSelector((state: RootState) => state.product.getLoading)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  console.log(currentUser)

  const columns: TableColumnsType<Product> = [
    {
      title: 'Image',
      dataIndex: 'file',
      key: 'file',
      render: (file: string) =>
        <Image
          height={90}
          src={file}
          alt="Ürün Fotoğrafı"
          style={{ objectFit: 'cover' }}
        />
    },
    {
      title: 'Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Serial No',
      dataIndex: 'serialNo',
      key: 'serialNo',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <div className='flex gap-8'>
          <div className={["Admin"].includes(currentUser?.status) ? "text-red-600 text-[14px] " : "hidden"}>You Don't Have Authorization</div>
          <button className={["Admin"].includes(currentUser?.status) ? "hidden" : "text-red-600 text-[18px] "} onClick={() => handleDelete(record)}> <MdDeleteOutline /></button>
        </div>
      ),
    },
  ];

  const handleDelete = async (product: Product) => {
    try {
      if (product.id) {
        await dispatch(deleteProduct(product.id)).unwrap()
        alert(`${product.productName} silindi !!`)
        await dispatch(getProduct()).unwrap();
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    dispatch(getProduct()).unwrap();
  }, [dispatch]);

  return (
    ["Master Admin", "Admin"].includes(currentUser?.status)
      ? <div className='w-full p-7'>
        <h1 className='text-xl font-bold mb-2 tracking-[1px]'>Product List</h1>
        <hr className='mb-4' />
        {getLoading
          ? "Loading"
          : <Table<Product> columns={columns} dataSource={products} rowKey={(record) => record.id || record.serialNo || Math.random().toString()} />
        }
      </div>
      : <Found404Page />
  );
};

export default ProductListPage;