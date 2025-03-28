import servicesData from "../data/service.json";

const imageMapping = {
  1: "https://th.bing.com/th/id/OIP.hywKLMLyMihZXT9KSCCX4QHaL1?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  2: "https://th.bing.com/th/id/OIP.0Q_ZgKGciDICEMRejYWANgHaG3?w=208&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  3: "https://th.bing.com/th/id/OIP.AY_3nuEnnIO__xF7UHL-8wHaIs?w=151&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  4: "https://th.bing.com/th/id/OIP.5FN61ZqYuTAiTvNUTopG2AHaE9?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  5: "https://th.bing.com/th/id/OIP.r-Rxzk-lit9u6DREW8DQNgHaKZ?w=208&h=293&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  6: "https://th.bing.com/th/id/OIP.y4U9gWe3c48nudWoeSqcegHaJN?w=208&h=259&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  7: "https://th.bing.com/th/id/OIP.z4HhOqdfko8WmEbpZnjcJAHaE8?w=278&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  8: "https://th.bing.com/th/id/OIP.3UewTOt1l2rBwtaJ9djdaAHaHD?w=197&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  9: "https://th.bing.com/th/id/OIP.BPVu2Gg-NGVIW5m2YVIMBAHaE8?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  10: "https://th.bing.com/th/id/OIP.xB7vgnG1GjrYMCRmcb0ZCQHaKX?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  11: "https://th.bing.com/th/id/OIP.AheiDobjeQJdGsmu4jum6QHaHU?w=182&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  12: "https://th.bing.com/th/id/OIP.oVqQovLKSuXUwsUwhBjC4wHaE8?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
};

export default function ServiceCard({ limit }) {
  const displayedServices = limit ? servicesData.slice(0, limit) : servicesData;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {displayedServices.map((service, index) => (
          <div
            key={index}
            className="p-4 bg-white text-black rounded-2xl text-center w-60 border-2 shadow-lg"
          >
            <img
              src={
                imageMapping[service.id] || "https://via.placeholder.com/150"
              }
              alt={service.service}
              className="w-40 h-40 rounded-lg mx-auto"
            />
            <h2 className="font-semibold text-xl mt-2">{service.service}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
