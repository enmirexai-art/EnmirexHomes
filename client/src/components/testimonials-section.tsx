import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      subtitle: "Relocated to Dallas",
      content: "I needed to sell my home quickly due to a job relocation. Enmirex Homes made the process incredibly easy and stress-free. They gave me a fair offer and closed in just 10 days. Couldn't be happier!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      subtitle: "Inherited Property",
      content: "After inheriting my grandmother's home, I didn't know what to do with it. The team at Enmirex was so helpful and understanding. They bought it as-is and saved me months of headaches. Thank you!",
      rating: 5
    },
    {
      id: 3,
      name: "David & Lisa Martinez",
      subtitle: "Avoided Foreclosure",
      content: "We were facing foreclosure and running out of options. Enmirex Homes came to our rescue! They helped us avoid foreclosure and gave us a chance to start fresh. We're forever grateful.",
      rating: 5
    }
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex text-secondary mb-4">
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">What Our Clients Say About Enmirex Homes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what homeowners have to say about their experience with Enmirex Homes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="font-semibold text-primary">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.subtitle}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}