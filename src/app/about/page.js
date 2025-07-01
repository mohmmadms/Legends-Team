import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Jordan Adventure Tours is a locally owned company dedicated to
            providing unforgettable experiences in Jordan's most beautiful
            landscapes.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full">
              <Image
                src="/images/about-team.jpg"
                alt="Our team"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="prose text-gray-600">
                <p>
                  Founded in 2010 by a group of passionate Jordanian adventurers,
                  Jordan Adventure Tours began with a simple mission: to share
                  the breathtaking beauty of our country with the world while
                  preserving its natural wonders and supporting local
                  communities.
                </p>
                <p>
                  What started as a small operation with just two guides and a
                  single 4x4 vehicle has grown into one of Jordan's most
                  respected adventure tour companies, with a team of over 30
                  expert guides and a fleet of modern vehicles.
                </p>
                <p>
                  We're proud to have introduced thousands of visitors to
                  Jordan's incredible landscapes while maintaining our commitment
                  to sustainable tourism practices and authentic cultural
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Al-Masri",
                role: "Founder & Lead Guide",
                bio: "Ahmed grew up in Wadi Rum and has been exploring Jordan's deserts since childhood. He's a certified wilderness first responder and speaks Arabic, English, and French.",
                image: "/images/team-ahmed.jpg",
              },
              {
                name: "Layla Haddad",
                role: "Operations Manager",
                bio: "Layla handles all the logistics to ensure your trip runs smoothly. With a background in tourism management, she's an expert at creating seamless travel experiences.",
                image: "/images/team-layla.jpg",
              },
              {
                name: "Yousef Najjar",
                role: "Senior Guide",
                bio: "Yousef specializes in Petra and the Dead Sea region. His knowledge of Nabatean history and geology brings ancient sites to life for our guests.",
                image: "/images/team-yousef.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 order-last lg:order-first">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Sustainable Tourism",
                    description:
                      "We're committed to minimizing our environmental impact and supporting conservation efforts in Jordan's natural areas.",
                  },
                  {
                    title: "Authentic Experiences",
                    description:
                      "We believe in showing visitors the real Jordan, from local cuisine to cultural traditions.",
                  },
                  {
                    title: "Safety First",
                    description:
                      "All our guides are trained in first aid and wilderness safety, with top-quality equipment for every adventure.",
                  },
                  {
                    title: "Community Support",
                    description:
                      "We work closely with local communities, employing Jordanian staff and supporting small businesses.",
                  },
                ].map((value, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 lg:h-full">
              <Image
                src="/images/about-values.jpg"
                alt="Our values"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}