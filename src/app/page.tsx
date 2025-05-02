import Link from "next/link";

const Home = () => {
  return (
    <div className="text-4xl flex  justify-center items-center h-screen " >
      Hey there
      Click&nbsp;<Link className="hover:underline hover:text-blue-600  " href='/documents/113' >here</Link>&nbsp;to go to document id
    </div>
  )
}
export default Home;