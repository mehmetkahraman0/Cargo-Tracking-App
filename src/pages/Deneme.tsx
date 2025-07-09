import VirtualList from 'rc-virtual-list';

const Deneme = () => {
  const data = Array.from({ length: 1000 }, (_, i) => `Item #${i + 1}`);

  return (
    <div className='w-full'>
      <div style={{ border: '1px solid #ccc', width: 300, height: 400 }}>
        <VirtualList
          data={data}
          height={400}            // container yüksekliği
          itemHeight={32}         // her elemanın yüksekliği
          itemKey={(item) => item} // her item için benzersiz key
        >
          {(item) => (
            <div style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
              {item}
            </div>
          )}
        </VirtualList>
      </div>
    </div>
  )
}

export default Deneme