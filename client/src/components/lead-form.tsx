import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function LeadForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    propertyAddress: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    propertyCondition: "",
    sellingReason: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    additionalDetails: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for your submission! We will contact you within 24 hours with your cash offer.",
      });
      setFormData({
        propertyAddress: "",
        city: "",
        state: "",
        zipCode: "",
        propertyType: "",
        bedrooms: "",
        bathrooms: "",
        squareFootage: "",
        propertyCondition: "",
        sellingReason: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        additionalDetails: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.propertyAddress || !formData.city || !formData.state || 
        !formData.zipCode || !formData.fullName || !formData.phoneNumber || 
        !formData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="get-offer" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Free Cash Offer</h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll contact you within 24 hours with a fair cash offer for your property.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="propertyAddress">Property Address *</Label>
                  <Input
                    id="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Your City"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="12345"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                      <SelectItem value="mobile">Mobile Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input
                    id="squareFootage"
                    value={formData.squareFootage}
                    onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                    placeholder="e.g. 1500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="propertyCondition">Property Condition</Label>
                <Select value={formData.propertyCondition} onValueChange={(value) => handleInputChange("propertyCondition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Move-in ready</SelectItem>
                    <SelectItem value="good">Good - Minor repairs needed</SelectItem>
                    <SelectItem value="fair">Fair - Some repairs needed</SelectItem>
                    <SelectItem value="poor">Poor - Major repairs needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sellingReason">Reason for Selling</Label>
                <Select value={formData.sellingReason} onValueChange={(value) => handleInputChange("sellingReason", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relocating">Relocating</SelectItem>
                    <SelectItem value="foreclosure">Facing Foreclosure</SelectItem>
                    <SelectItem value="inherited">Inherited Property</SelectItem>
                    <SelectItem value="divorce">Divorce</SelectItem>
                    <SelectItem value="financial">Financial Hardship</SelectItem>
                    <SelectItem value="tired-landlord">Tired of Being Landlord</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="additionalDetails">Additional Details</Label>
                <Textarea
                  id="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                  placeholder="Tell us anything else about your property or situation that might be helpful..."
                  rows={4}
                />
              </div>

              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="bg-primary text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 w-full md:w-auto"
                >
                  {submitMutation.isPending ? "Submitting..." : "Get My Free Cash Offer"}
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  No obligation. We respect your privacy and will never share your information.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
