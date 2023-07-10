import axios from 'axios';
import { useState,useEffect } from "react";
import { stat } from "fs";
import Link from 'next/link';

// const client = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com/posts"
// });

const koneksiHelmku = axios.create({
   baseURL: "http://127.0.0.1:5000/api/helmku"
 }); 

export default function FormHelmku() {
    const [helmku, setHelmku] =  useState(null);
    const [kode_helm, setKode_helm] = useState("");
    const [nama_helm, setNama_helm] = useState("");
    const [size_helm, setSize_helm] = useState("");
    const [foto, setFoto] = useState("");
    const [pembeli, setPembeli] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");

  const handleSubmitAdd =  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiHelmku
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });    
 }

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = "/"+event.target.kode_helm.value;
      alert(address);
  //const formData = new FormData(event.target);
    const formData = {
      kode_helm: event.target.kode_helm.value,
      nama_helm: event.target.nama_helm.value,
      size_helm: event.target.size_helm,
      foto: event.target.foto,
      pembeli: event.target.pembeli,
      }

  alert(formData);
  koneksiHelmku
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

    const handleAdd = (event) => {
      setAdd("show");
      setbtnAdd("hide");
      setEdit("hide");   
}

    const handleCancelAdd = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
}

    const handleCancelEdit = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
      setKode_helm("");
      setNama_helm("");
      setSize_helm("");
      setFoto("");
      setPembeli("");
}

    const handleDelete = (event) => {
      event.preventDefault();
      var kode_helm = event.target.value;
      koneksiHelmku.delete(`/${kode_helm}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
          setHelmku(
            helmku.filter((helmku) => {
               return helmku.kode_helm !== kode_helm;
            }))
       
          // Lakukan langkah-langkah lain setelah penghapusan data
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
    })
  }

  const handleEdit = (event) => {
    event.preventDefault();
    const targetValue = event.target.value;
  
    const hmEdit = helmku.find((helmku) => helmku.kode_helm === targetValue);
  
    if (hmEdit) {
      setKode_helm(hmEdit.kode_helm);
      setNama_helm(hmEdit.nama_helm);
      setSize_helm(hmEdit.size_helm);
      setFoto(hmEdit.foto);
      setPembeli(hmEdit.pembeli);
      setAdd("hide");
      setbtnAdd("hide");
      setEdit("show");
    }
  }

    useEffect(() => {
      async function getHelmku() {
        const response = await koneksiHelmku.get("/").then(function (axiosResponse) {
            setHelmku(axiosResponse.data.data);
         })
         .catch(function (error) {
         
          alert('error from helmku in api helmku: '+error);
         });;
          }
      getHelmku();
    }, []);

  if(!helmku) {
    return (

      <div><center><h1>Loading...</h1></center></div>

    )
  }

  else{
    return (
      
      <center> 
      <div className="background">
      
      <h1 style={{fontFamily: "Comic Sans MS", color:"white", fontSize:"45px",  }}>HELM SHAQ</h1><br />

      <div>
      <title>Ishaq Maulana 21560013</title>
      <button id="btnadd" onClick={handleAdd} className={statebutonadd} 
              style={{backgroundColor: "#1D87E4",
                      color:"white",
                      borderWidth:"2px",
                      padding:"15px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>BELI</button>

       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}><br></br>
       <h2 style={{color:"black", fontSize:"25px"}}>Masukan Data</h2><br></br>

        <table border={0}>
            <tbody style={{color:"black",padding:"3px", fontSize:"15px"}}>
        
        <tr>
            <td><label> Kode Helm : </label></td>
            <td><input type="text" id="kode_helm" name="kode_helm"/></td>
        </tr> 

        <tr>
            <td><label> Nama Helm : </label></td>
            <td><input type="text" id="nama_helm" name="nama_helm"/></td>
        </tr> 

        <tr>
            <td><label> Size Helm : </label></td>
            <td><input type="text" id="size_helm" name="size_helm"/></td>
        </tr> 

        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr>

        <tr>
            <td><label> Pembeli : </label></td>
            <td><input type="text" id="pembeli" name="pembeli"/></td>
        </tr> 
        
        <br ></br>

            </tbody>
        </table>

          <input type="submit"  
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"#133697",
                        cursor: "pointer"
                        }}/>

          <input type="button" value="cancel" onClick={handleCancelAdd} 
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"#133697",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form>  
      
 <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}><br></br>
          <h2 style={{color:"white"}}>Form Edit</h2><br></br>

        <table>
              <tbody style={{color:"white"}}>
        <tr>
            <td><label> Kode Helm : </label></td>
            <td><input type="text" id="kode_helm"  value={kode_helm} name="kode_helm"/></td>
        </tr>

        <tr>
            <td><label> Nama Helm : </label></td>
            <td><input type="text" id="nama_helm"  value={nama_helm} name="nama_helm"
               onChange={(e) => setNama_helm(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Size Helm : </label></td>
            <td><input type="text" id="size_helm"  value={size_helm} name="size_helm"
               onChange={(e) => setSize_helm(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr>

        <tr>
            <td><label> Pembeli : </label></td>
            <td><input type="text" id="pembeli"  value={pembeli} name="pembeli"
               onChange={(e) => setPembeli(e.target.value)}/></td>
        </tr>

        <br ></br>

              </tbody>
          </table>

          <input type="submit" 
                style={{padding:"3px",
                        color:"black",
                        backgroundColor:"white",
                        cursor: "pointer"
                        }}/>


          <input type="button" value="cancel" onClick={handleCancelEdit}  
                style={{padding: "3px",
                        color:"black",
                        backgroundColor:"white",
                        cursor: "pointer"
                      }}
           
          /><br ></br><br ></br>
          </form><br/><br/>
      
          <h3 style={{fontFamily:"times", fontSize:"27px", backgroundColor:"#1D87E4", color:"white", }}>
            Tabel Transaksi</h3> <br />
          
          <table>
              <thead>
                <tr>         
                <th className='desain'>Kode Helm</th>
                <th className='desain'>Nama Helm</th>
                <th className='desain'>Size Helm</th>
                <th className='desain'>Foto</th>
                <th className='desain'>Pembeli</th>
                <th colSpan={2} className='desain2'>Opsi</th>
                </tr>
              </thead>
      
              <tbody>
              {helmku.map((hm) =>
                  <tr style={{textAlign:'center'}}> 
                    <td className='desain'> {hm.kode_helm}</td>
                    <td className='desain'>{hm.nama_helm}</td>
                    <td className='desain'>{hm.size_helm}</td>
                    <td className='desain'><img src={hm.foto} width="120"/></td>
                    <td className='desain'>{hm.pembeli}</td>

          <td className='desain'><button onClick={handleEdit} value={hm.kode_helm} 
              style={{backgroundColor: "white",
                      color:"black",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Edit</button></td>

          <td className='desain'><button onClick={handleDelete} value={hm.kode_helm}
              style={{backgroundColor: "white",
                      color:"black",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Hapus</button></td>

                  </tr>
              )}
              </tbody>
    </table>
            
    </div>
    </div>
    </center>     
            
    )
  }
  }