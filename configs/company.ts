import logo from "@/utils/pdf/assets/images/logo";
export const company = {
  name: "Company Name",
  // base64 logo for pdf
  logo: logo,
  address: {
    street1: "1212 Mockingbird Ln",
    street2: "",
    city: "Los Angeles",
    state: "CA",
    zipcode: "92283",
  },
  phone: "+1 (555) 555-5555",
  email: "hello@hello.com",
  // used in pdf generation
  mainContacts: {
    purchasing: {
      firstName: "Holdito",
      lastName: "theCat",
      email: 'purchasing@hello.com'
    },
  },
};
