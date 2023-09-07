import React from 'react'

function QnaCard({Details}) {
    
    
  return (
    <div>
        <div className="containerwa"  mb={2} >
            <div >
                <legend >Username :{Details?.user?.name}</legend>
                {/* <legend m={1} className="company" ></legend> */}
                <legend > Message : {Details?.question}</legend>
            </div>
        </div>
    </div>
  )
}

export default QnaCard