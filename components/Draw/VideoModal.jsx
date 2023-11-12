import parse from 'html-react-parser';
function VideoModal({product,setVideoUrl}) {
    console.log(product,'pro')
    return (
        <div>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal sm:modal-middle min-w-full  min-w-[660px !w-96">
  <div className="modal-box]">
    <h3 className="text-lg font-bold">Draw Video!</h3>
    {/* <YouTube videoId={product?.videoUrl?.split('v=')[1]} onReady={onReady} /> */}
   {
    parse(JSON.parse(product))
   }
  </div>
  <label onClick={()=>setVideoUrl('')} className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div>
        </div>
    );
}

export default VideoModal;