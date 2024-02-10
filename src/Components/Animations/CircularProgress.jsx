import React, { useEffect } from "react";

const CircularProgress = ({value, Length}) => {
    

useEffect(() => {
    const myNum = document.querySelectorAll('.progress-value')
    // console.log(myNum.innerText)
    // let speed = 200;
    let speed = 10;
    
    myNum.forEach( (myCount) => {
        
        
        let target_count = myCount.dataset.count;
        let init_count = +myCount.innerText;
        // console.log(target_count)
        
        let new_increment_num = Math.floor(target_count / speed);
        
        const updateNumber = () => {
            init_count +=  new_increment_num;
            myCount.innerText = init_count;
            
            if(init_count < target_count){
                // setTimeout(() => {updateNumber()}, 4)  
                setTimeout(() => {updateNumber()}, 2000/speed * 2)  
            }
        }
        // 2000s   100
        updateNumber();
        
    })
}, [])

  return (
    <>
      {/* <div className="row d-flex justify-content-center mt-100"> */}
        {/* <div className="col-md-6"> */}
          <div className="progress blue ">
            <span className="progress-left">
              <span className="progress-bar"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar"></span>
            </span>
            <h2 className="progress-value x-y-center" data-count="10">0</h2>
            {/* <h2 className="progress-value x-y-center" data-count={Number(value)}>0</h2> */}
          {/* </div> */}

          {/* <div className="progress yellow">
            <span className="progress-left">
              <span className="progress-bar"></span>
            </span>
            <span className="progress-right">
              <span className="progress-bar"></span>
            </span>
            <div className="progress-value">37.5%</div>
          </div> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default CircularProgress;
