import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function LeadForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

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

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validate step 1 fields
  const validateStep1 = () => {
    const requiredFields = ["propertyAddress", "city", "state", "zipCode", "phoneNumber"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

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
      setCurrentStep(1);
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
    
    if (currentStep === 1) {
      // Validate step 1 and proceed to step 2
      if (validateStep1()) {
        nextStep();
      }
    } else {
      // Final submission (step 2)
      // Basic validation for required fields
      if (!formData.fullName || !formData.email) {
        toast({
          title: "Validation Error",
          description: "Please fill in your name and email address.",
          variant: "destructive",
        });
        return;
      }
      submitMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="get-offer" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary mb-4">
              Get Your Free Cash Offer
            </CardTitle>
            <p className="text-lg text-gray-600">
              {currentStep === 1 
                ? "Tell us about your property and contact information." 
                : "Provide additional details about your property."
              }
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className={`flex items-center ${currentStep === 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${
                  currentStep === 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Property Info</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4">
                <div className={`h-full bg-primary transition-all duration-300 ${
                  currentStep > 1 ? 'w-full' : 'w-0'
                }`}></div>
              </div>
              <div className={`flex items-center ${currentStep === 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${
                  currentStep === 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Property Details</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Property Address and Phone Number */}
              {currentStep === 1 && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="propertyAddress">Property Address *</Label>
                      <Input
                        id="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                        placeholder="123 Main Street"
                        required
                        data-testid="input-property-address"
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
                        data-testid="input-city"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger data-testid="select-state">
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
                        data-testid="input-zip-code"
                      />
                    </div>
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
                      data-testid="input-phone-number"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary/90 shadow-lg border-2 border-secondary"
                      data-testid="button-next-step"
                    >
                      Next Step <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Additional Details */}
              {currentStep === 2 && (
                <>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                        <SelectTrigger data-testid="select-property-type">
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
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                        <SelectTrigger data-testid="select-bedrooms">
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
                        <SelectTrigger data-testid="select-bathrooms">
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
                  </div>

                  <div>
                    <Label htmlFor="squareFootage">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      value={formData.squareFootage}
                      onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                      placeholder="e.g. 1500"
                      data-testid="input-square-footage"
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyCondition">Property Condition</Label>
                    <Select value={formData.propertyCondition} onValueChange={(value) => handleInputChange("propertyCondition", value)}>
                      <SelectTrigger data-testid="select-property-condition">
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
                      <SelectTrigger data-testid="select-selling-reason">
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
                    <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="John Smith"
                          required
                          data-testid="input-full-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@email.com"
                          required
                          data-testid="input-email"
                        />
                      </div>
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
                      data-testid="input-additional-details"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="px-8 py-3 rounded-lg font-bold text-lg"
                      data-testid="button-back"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" /> Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      disabled={submitMutation.isPending}
                      className="bg-primary text-white px-12 py-3 rounded-lg font-bold text-lg hover:bg-primary/90 shadow-lg border-2 border-secondary"
                      data-testid="button-submit-offer"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Get My Free Cash Offer"}
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    No obligation. We respect your privacy and will never share your information.
                  </p>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}