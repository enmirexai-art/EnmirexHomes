import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Square } from "lucide-react";

export default function PropertyShowcase() {
  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      price: "$285,000",
      title: "Traditional Family Home",
      beds: 3,
      baths: 2,
      sqft: "1,850",
      description: "Closed in 8 days - Seller needed to relocate quickly for job"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      price: "$195,000",
      title: "Ranch Style Home",
      beds: 2,
      baths: 1,
      sqft: "1,200",
      description: "Bought as-is - Saved seller $30K in repairs"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      price: "$425,000",
      title: "Victorian Character Home",
      beds: 4,
      baths: 3,
      sqft: "2,400",
      description: "Inherited property - Helped family avoid lengthy probate"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      price: "$165,000",
      title: "Contemporary Home",
      beds: 3,
      baths: 2,
      sqft: "1,450",
      description: "Foreclosure avoided - Closed in 5 days"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      price: "$325,000",
      title: "Craftsman Bungalow",
      beds: 3,
      baths: 2,
      sqft: "1,650",
      description: "Tired landlord - Sold with tenants in place"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      price: "$385,000",
      title: "Modern Suburban Home",
      beds: 4,
      baths: 3,
      sqft: "2,200",
      description: "Divorce sale - Quick, discreet transaction"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Recently Purchased Properties</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            See some of the properties we've helped homeowners sell quickly for cash.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-2">{property.price}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex flex-wrap items-center text-gray-600 text-xs sm:text-sm gap-2 sm:gap-4 mb-3">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 sm:w-4 h-3 sm:h-4" />
                    {property.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 sm:w-4 h-3 sm:h-4" />
                    {property.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-3 sm:w-4 h-3 sm:h-4" />
                    {property.sqft} sq ft
                  </span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">{property.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}