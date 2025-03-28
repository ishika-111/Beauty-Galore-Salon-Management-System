import NavBar from "../../components/NavBar";
import ServiceCard from "../../components/ServiceCard";

export default function ServicePage() {
  return (
    <div className="border-2 border-black">
      <h1 className="text-center text-3xl font-semibold ">Our Services</h1>
      <div className="flex gap-4 mt-3">
        <ServiceCard />
      </div>
    </div>
  );
}
