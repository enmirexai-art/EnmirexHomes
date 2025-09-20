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
    otherReason: "",
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
        otherReason: "",
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
    <section id="get-offer" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
              Get Your Free Cash Offer
            </CardTitle>
            <p className="text-base sm:text-lg text-gray-600">
              {currentStep === 1 
                ? "Tell us about your property and contact information." 
                : "Provide additional details about your property."
              }
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4 sm:mt-6">
              <div className={`flex items-center ${currentStep === 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`rounded-full w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border-2 text-sm ${
                  currentStep === 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-1 sm:ml-2 font-medium text-sm sm:text-base">Property Info</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4">
                <div className={`h-full bg-primary transition-all duration-300 ${
                  currentStep > 1 ? 'w-full' : 'w-0'
                }`}></div>
              </div>
              <div className={`flex items-center ${currentStep === 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`rounded-full w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border-2 text-sm ${
                  currentStep === 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-1 sm:ml-2 font-medium text-sm sm:text-base">Property Details</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-12">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Step 1: Property Address and Phone Number */}
              {currentStep === 1 && (
                <>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="propertyAddress" className="text-sm sm:text-base">Property Address *</Label>
                      <Input
                        id="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                        placeholder="123 Main Street"
                        required
                        className="h-11 sm:h-12 text-base"
                        data-testid="input-property-address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm sm:text-base">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Your City"
                        required
                        className="h-11 sm:h-12 text-base"
                        data-testid="input-city"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="state" className="text-sm sm:text-base">State *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger className="h-11 sm:h-12 text-base" data-testid="select-state">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300 shadow-lg">
                          <SelectItem value="AL" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Alabama</SelectItem>
                          <SelectItem value="CA" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">California</SelectItem>
                          <SelectItem value="FL" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Florida</SelectItem>
                          <SelectItem value="TX" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Texas</SelectItem>
                          <SelectItem value="NY" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">New York</SelectItem>
                          <SelectItem value="NC" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">North Carolina</SelectItem>
                          <SelectItem value="GA" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Georgia</SelectItem>
                          <SelectItem value="OH" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Ohio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-sm sm:text-base">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="12345"
                        required
                        className="h-11 sm:h-12 text-base"
                        data-testid="input-zip-code"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber" className="text-sm sm:text-base">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="(469) 730-6711"
                      required
                      className="h-11 sm:h-12 text-base"
                      data-testid="input-phone-number"
                    />
                  </div>

                  <div className="flex justify-center sm:justify-end pt-4">
                    <button 
                      type="submit"
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 rounded-lg font-bold text-base sm:text-lg hover:opacity-90 transition-opacity shadow-lg border-2 flex items-center justify-center"
                      style={{
                        backgroundColor: 'hsl(218, 100%, 12%)',
                        color: 'white',
                        borderColor: 'hsl(45, 100%, 50%)'
                      }}
                      data-testid="button-next-step"
                    >
                      Next Step <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Additional Details */}
              {currentStep === 2 && (
                <>
                  <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="propertyType" className="text-sm sm:text-base">Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                        <SelectTrigger className="h-11 sm:h-12 text-base" data-testid="select-property-type">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300 shadow-lg">
                          <SelectItem value="single-family" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Single Family Home</SelectItem>
                          <SelectItem value="townhouse" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Townhouse</SelectItem>
                          <SelectItem value="condo" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Condo</SelectItem>
                          <SelectItem value="multi-family" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Multi-Family</SelectItem>
                          <SelectItem value="mobile" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Mobile Home</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bedrooms" className="text-sm sm:text-base">Bedrooms</Label>
                      <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                        <SelectTrigger className="h-11 sm:h-12 text-base" data-testid="select-bedrooms">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300 shadow-lg">
                          <SelectItem value="1" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">1</SelectItem>
                          <SelectItem value="2" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">2</SelectItem>
                          <SelectItem value="3" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">3</SelectItem>
                          <SelectItem value="4" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">4</SelectItem>
                          <SelectItem value="5+" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bathrooms" className="text-sm sm:text-base">Bathrooms</Label>
                      <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                        <SelectTrigger className="h-11 sm:h-12 text-base" data-testid="select-bathrooms">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300 shadow-lg">
                          <SelectItem value="1" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">1</SelectItem>
                          <SelectItem value="1.5" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">1.5</SelectItem>
                          <SelectItem value="2" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">2</SelectItem>
                          <SelectItem value="2.5" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">2.5</SelectItem>
                          <SelectItem value="3+" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="squareFootage" className="text-sm sm:text-base">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      value={formData.squareFootage}
                      onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                      placeholder="e.g. 1500"
                      className="h-11 sm:h-12 text-base"
                      data-testid="input-square-footage"
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyCondition" className="text-sm sm:text-base">Property Condition</Label>
                    <Select value={formData.propertyCondition} onValueChange={(value) => handleInputChange("propertyCondition", value)}>
                      <SelectTrigger className="h-11 sm:h-12 text-base" data-testid="select-property-condition">
                        <SelectValue placeholder="Select Condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 shadow-lg">
                        <SelectItem value="excellent" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Excellent - Move-in ready</SelectItem>
                        <SelectItem value="good" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Good - Minor repairs needed</SelectItem>
                        <SelectItem value="fair" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Fair - Some repairs needed</SelectItem>
                        <SelectItem value="poor" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Poor - Major repairs needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sellingReason" className="text-sm sm:text-base">Reason for Selling</Label>
                    <Select value={formData.sellingReason} onValueChange={(value) => handleInputChange("sellingReason", value)}>
                      <SelectTrigger className="h-11 sm:h-12 text-base" data-testid="select-selling-reason">
                        <SelectValue placeholder="Select Reason" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 shadow-lg">
                        <SelectItem value="relocating" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Relocating</SelectItem>
                        <SelectItem value="foreclosure" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Facing Foreclosure</SelectItem>
                        <SelectItem value="inherited" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Inherited Property</SelectItem>
                        <SelectItem value="divorce" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Divorce</SelectItem>
                        <SelectItem value="financial" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Financial Hardship</SelectItem>
                        <SelectItem value="tired-landlord" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Tired of Being Landlord</SelectItem>
                        <SelectItem value="other" className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white cursor-pointer">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Show additional input when "Other" is selected */}
                  {formData.sellingReason === "other" && (
                    <div>
                      <Label htmlFor="otherReason" className="text-sm sm:text-base">Please specify other reason</Label>
                      <Input
                        id="otherReason"
                        value={formData.otherReason}
                        onChange={(e) => handleInputChange("otherReason", e.target.value)}
                        placeholder="Please describe your reason for selling..."
                        className="h-11 sm:h-12 text-base"
                        data-testid="input-other-reason"
                      />
                    </div>
                  )}

                  <div className="border-t pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">Contact Information</h3>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="fullName" className="text-sm sm:text-base">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="John Smith"
                          required
                          className="h-11 sm:h-12 text-base"
                          data-testid="input-full-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm sm:text-base">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@email.com"
                          required
                          className="h-11 sm:h-12 text-base"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalDetails" className="text-sm sm:text-base">Additional Details</Label>
                    <Textarea
                      id="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                      placeholder="Tell us anything else about your property or situation that might be helpful..."
                      rows={4}
                      className="text-base"
                      data-testid="input-additional-details"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg w-full sm:w-auto order-2 sm:order-1"
                      data-testid="button-back"
                    >
                      <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 mr-2" /> Back
                    </Button>
                    
                    <button 
                      type="submit" 
                      disabled={submitMutation.isPending}
                      className="w-full sm:w-auto px-8 sm:px-12 py-3 rounded-lg font-bold text-base sm:text-lg hover:opacity-90 transition-opacity shadow-lg border-2 disabled:opacity-50 order-1 sm:order-2"
                      style={{
                        backgroundColor: 'hsl(218, 100%, 12%)',
                        color: 'white',
                        borderColor: 'hsl(45, 100%, 50%)'
                      }}
                      data-testid="button-submit-offer"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Get My Free Cash Offer"}
                    </button>
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