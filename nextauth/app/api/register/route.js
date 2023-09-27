import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const data = await request.json();

    const response = await axios.post("/register", data, {
      baseURL: "http://localhost:4000"
    });

    if (response.status === 201) {
      return NextResponse.json(response.data, { status: response.status });
    } 
  } catch (error) {
    return NextResponse.json(error.response.data.message, {
      status: error.response.status,
    });
  }
  
}




// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(request) {
//     const data = await request.json();

//     axios.post("/register", data, {
//         baseURL: "http://localhost:4000"
//     })
//       .then((res) => {
//         if (res.status === '201') {
//             return NextResponse.json(res.data)
//         }
//       })
//       .catch((error) => {
//         console.log('ERROR____', error.response.data.message)
//         const data = error.response.data.message
//         // throw new Error(`Server returned status code ${data}`);
//         return NextResponse.error(`${data}`)
//       })
//     return NextResponse.json('Error')
// }