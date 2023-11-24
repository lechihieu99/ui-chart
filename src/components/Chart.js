import React, { useState } from "react";
import Column from "./Column";

function Chart(props) {
    const [chartData, setChartData] = useState({
      id: 1,
      mon: "Toan",
      thangdiem: 10,
      w: 500,
      h: 500,
      dsdiem: [
        {
          id: 1,
          thi: "45p",
          tytrong: 0.4,
          x: 20,
          y: 0,
          w: 60,
          h: 50,
          isSelected: false,
          z: 2,
        },
        {
          id: 2,
          thi: "Giua ki",
          tytrong: 0.4,
          x: 100,
          y: 0,
          w: 60,
          h: 50,
          isSelected: false,
          z: 2,
        },
        {
          id: 3,
          thi: "Cuoi ki",
          tytrong: 0.6,
          x: 300,
          y: 0,
          w: 60,
          h: 50,
          isSelected: false,
          z: 2,
        },
      ],
    });
    const [update, setUpdate] = useState(0);
    
    const updateColumn = (id, values, syncValues) => {
      setChartData(
        (prev) => (
            {
                ...prev,
                dsdiem: prev.dsdiem.map(diem => {
                    if (diem.id === id) return {...diem, ...values};
                    if (syncValues) return {...diem, ...syncValues};
                    return diem;
                })
            }
        )

        //   prev.map((typeBlock) => {
        //     // Update values inside this type Blockblock
        //     if (typeBlock.typeName === type) {
        //       typeBlock.list = typeBlock.list.map((el) => {
        //         if (el.id === id) return { ...el, ...values };
        //         if (syncValues) return { ...el, ...syncValues };
        //         return el;
        //       });
        //       return typeBlock;
        //     }
        //     if (syncValues) {
        //       typeBlock.list = typeBlock.list?.map((el) => {
        //         return { ...el, ...syncValues };
        //       });
        //       return typeBlock;
        //     }
        //     return typeBlock;
        //   })
        // prev.map((coor) => {
        //   if (coor.id === id) return { ...coor, ...values };
        //   if (syncValues) return { ...coor, ...syncValues };
        //   return coor;
        // })
      );
      setUpdate((prev) => prev + 1);
    };


    const renderedElements = chartData.dsdiem.map(diem => (
      <>
        <Column key={diem.thi} coor={diem} chartData={chartData} updateCoors={updateColumn}/>
      </>
    ));

   
    return (
      <div className="bg-repeat whitespace" id="boxDrop">
        <div className="coordinate">
          {/* O number */}
          <span className="position-absolute start-0 top-100 translate-middle">
            O
          </span>
          {/* X line */}
          {/* <div className="coordinate-x">
            <div className="arrow position-absolute top-50">
              <i className="fa-solid fa-arrow-right position-absolute top-50 start-100 translate-middle"></i>
            </div>
            <span className="position-absolute start-100 top-100 translate-middle">
              {}
            </span>
          </div> */}
          {/* Y line */}
          <div className="coordinate-y coordinate-vertical">
            <div className="arrow top-1/2">
              <i className="fa-solid fa-arrow-right absolute top-1/2 left-full"></i>
            </div>
            <span className="absolute start-full top-0">
              {chartData.thangdiem}
            </span>
          </div>
        </div>
        <div
          className=""
          style={{
            width: `${chartData.w}px`,
            height: `${chartData.h}px`,
            backgroundColor: "#F9F7F5",
          }}
        >
          {renderedElements}
        </div>
      </div>
    );




//   const [draggedColumn, setDraggedColumn] = useState(null);

//   const handleDragStart = (e, index) => {
//     // setDraggedColumn(index);
    
//   };
//   return (
//     <svg width={chartSize.w} height={chartSize.h} transform="scale(1, -1)" className="relative">
//       <rect x="0" y="0" width="100%" height="100%" fill="#eee" />
//       <text className="absolute chart__text">{chartData.thangdiem}</text>
//       <line x1="0" y1="0" x2="0" y2={chartSize.h} stroke="#000"></line>
//       <line x1="0" y1="0" x2={chartSize.w} y2="0" stroke="#000" />
//       {chartData.diem.map((column, index) => (
//         <>
//             <rect
//             key={column.thi}
//             x={(column.x / 100) * chartSize.w}
//             y={0}
//             width="50"
//             height={(column.diem / chartData.thangdiem) * chartSize.h}
//             fill="steelblue"
//             onMouseDown={(e) => handleDragStart(e, index)}
//             onMouseMove={(e) => handleDrag(index, e.movementX, e.movementY)}
//             />
//             <text 
//                 x={column.x / 100 * chartSize.w}
//                 y="20"
//             >{column.thi}</text>
//         </>
//       ))}
//     </svg>
//   );
}

export default Chart;
