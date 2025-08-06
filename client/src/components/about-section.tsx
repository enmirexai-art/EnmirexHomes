import { DollarSign, Zap, Shield } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: DollarSign,
      title: "Fair Cash Offers",
      description: "We provide competitive cash offers based on current market value, condition, and repairs needed."
    },
    {
      icon: Zap,
      title: "Lightning Fast Process",
      description: "From initial contact to closing, we can complete the entire process in as little as 7 days."
    },
    {
      icon: Shield,
      title: "No Hidden Fees",
      description: "Our offers are straightforward with no agent commissions, closing costs, or surprise fees."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Enmirex Homes?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're experienced real estate professionals who specialize in buying houses quickly for cash. 
              With over 10 years in the business, we've helped hundreds of homeowners sell their properties 
              without the hassle of traditional real estate transactions.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Professional real estate team in meeting" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Real estate professional reviewing property documents" 
              className="rounded-xl shadow-lg w-full h-auto mt-8" 
            />
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Home inspector with clipboard examining property" 
              className="rounded-xl shadow-lg w-full h-auto -mt-8" 
            />
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Professional handshake sealing real estate deal" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}