import "./bigPost.css"


function BigPost ({postUrl}:any) {
  return (
    <>
      <div className="bigPost" >
        <img src={postUrl} >
        </img>
        </div>
    </>
  );
}
export default BigPost ;