import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Layout({ ...props }) {
  return (
    <>
      <section className="main-darshboard">
        <Sidebar />
        <Header props= {props.children} />
        </section>
    </>
  );
}
