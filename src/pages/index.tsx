import Link from "next/link";

export default function Home() {
  return(
    
    <div className="wallpaper" style={{ position: "relative" }}>

<h2 style={{ color: "white", fontFamily: "Cooper Black", fontSize: "90px", position: "absolute", bottom: "0", right: "0" }}>
    HELM SHAQ
  </h2>

  <button className="start" style={{ position: "absolute", bottom: "15%", right: "-16%" }}>
    <Link href="/tabel">Belanja Sekarang!!</Link>
  </button>
  

    </div>

  )
}