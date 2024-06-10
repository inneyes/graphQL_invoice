const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

// Helper function to load JSON data from files
const loadJSON = (filename) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', filename), 'utf8'));
};

// Load JSON data
const poData = loadJSON('PO.json');
const creditNoteData = loadJSON('Credit_Note.json');
const debitNoteData = loadJSON('Debit_Note.json');
const deliveryOrderTaxInvoiceData = loadJSON('Delivery_OrderTax_Invoice.json');
const receiptTaxInvoiceData = loadJSON('ReceiptTax_Invoice.json');

// Define GraphQL schema
const typeDefs = gql `

 type Taxes {
  Tax: Tax
 }
 type Tax {
    Code: String
    Rate: Float
    Amount: Float
  }

  type LineItems {
    Item: [Item]
  }

  type Item {
    No: Int
    Id: Int
    Name: String
    Description: String
    Quantity: Int
    Unit: String
    Price: Float
    Allowances: String
    Amount: Float
    Tax: Tax
    TaxAmount: Float
    Total: Float
  }

  type Seller {
    ID: String
    Name: String
    TaxID: String
    TaxIDType: String
    Branch: Int
    BuildingNo: Int
    BuildingName: String
    Street: String
    District: String
    City: String
    Province: String
    PostalCode: Int
    CountryCode: String
    CountryName: String
    Telephone: String
    Fax: String
    Contact: String
    Department: String
    Email: String
  }

  type Buyer {
    ID: Int
    Name: String
    TaxID: String
    TaxIDType: String
    Branch: String
    BuildingNo: Int
    BuildingName: String
    Street: String
    District: String
    City: String
    Province: String
    PostalCode: Int
    CountryCode: String
    CountryName: String
    Telephone: String
    Fax: String
    Contact: String
    Department: String
    Email: String
  }

  type Summary {
    Data: [Data]
  }

  type Data {
    Label: String
    Amount: Float
  }

  type Settings {
    TaxInclusive: Boolean
    InlineTax: Boolean
    InlineAllowance: Boolean
    CumulativeAllowance: Boolean
  }

  type PurchaseOrder {
    TypeCode: String
    TypeNameTh: String
    TypeNameEn: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    DueDate: String
    PurposeCode: String
    Purpose: String
    References: String
    IssueToBranch: Int
    Remark: String
    CurrencyCode: String
    Currency: String
    LineItems: LineItems
    TotalQuantity: Int
    Quantity: Int
    Amount: Float
    ChargeTotal: Float
    AllowanceTotal: Float
    TaxBasisAmount: Float
    NonVat: Float
    TaxAmount: Float
    Taxes: Tax
    Total: Float
    Summary: Summary
    TotalEn: String
    TotalTh: String
    Settings: Settings
    Manager: String
    Position: String
  }

  type References {
    TypeCode: String
    No: String
    Date: String
  }

  type CreditNote {
    TypeCode: String
    TypeNameTh: String
    TypeNameEn: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    DueDate: String
    PurposeCode: String
    Purpose: String
    References: References
    OriginalAmount: Float
    CorrectAmount: Float
    DifferenceAmount: Float
    CurrencyCode: String
    Currency: String
    LineItems: LineItems
    TotalQuantity: Int
    Quantity: Int
    Amount: Float
    ChargeTotal: Float
    AllowanceTotal: Float
    TaxBasisAmount: Float
    TaxAmount: Float
    Taxes: Taxes
    Total: Float
    Summary: Summary
    TotalEn: String
    TotalTh: String
    Settings: Settings
    Manager: String
    Position: String
  }

  type DebitNote {
    TypeCode: String
    TypeNameTh: String
    TypeNameEn: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    DueDate: String
    PurposeCode: String
    Purpose: String
    References: References
    OriginalAmount: Float
    CorrectAmount: Float
    DifferenceAmount: Float
    CurrencyCode: String
    Currency: String
    LineItems: LineItems
    TotalQuantity: Int
    Quantity: Int
    Amount: Float
    ChargeTotal : Float
    AllowanceTotal: Float
    TaxBasisAmount: Float
    NonVat: Float
    TaxAmount: Float
    Taxes: Taxes
    Total: Float
    Summary: Summary
    TotalEn: String
    TotalTh: String
    Settings: Settings
    Manager: String
    Position: String
  }

  type DeliveryOrderTaxInvoice {
    TypeCode: String
    TypeNameTh: String
    TypeNameEn: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    DueDate: String
    PurposeCode: String
    Purpose: String
    References: References
    Remark: String
    FormOfPayment : String
    CurrencyCode: String
    Currency: String
    LineItems: LineItems
    TotalQuantity: Int
    Quantity: Int
    Amount: Float
    ChargeTotal : Float
    AllowanceTotal: Float
    TaxBasisAmount: Float
    NonVat: Float
    TaxAmount: Float
    Taxes: Taxes
    Total: Float
    Summary: Summary
    TotalEn: String
    TotalTh: String
    Settings: Settings
    Manager: String
    Position: String
  }

  type ReceiptTaxInvoice {
    TypeCode: String
    TypeNameTh: String
    TypeNameEn: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    DueDate: String
    PurposeCode: String
    Purpose: String
    References: References
    CurrencyCode: String
    Currency: String
    LineItems: LineItems
    TotalQuantity: Int
    Quantity: Int
    Amount: Float
    ChargeTotal: Float
    AllowanceTotal: Float
    TaxBasisAmount: Float
    NonVat: Float
    TaxAmount: Float
    Taxes: Taxes
    Total: Float
    Summary: Summary
    TotalEn: String
    TotalTh: String
    Settings: Settings
    Manager: String
    Position: String
  }

  type Query {
    getPurchaseOrder: PurchaseOrder
    getCreditNote: CreditNote
    getDebitNote: DebitNote
    getDeliveryOrderTaxInvoice: DeliveryOrderTaxInvoice
    getReceiptTaxInvoice: ReceiptTaxInvoice
  }
`;

// Define resolvers
const resolvers = {
    Query: {
        getPurchaseOrder: () => poData.GetInvoice,
        getCreditNote: () => creditNoteData.GetInvoice,
        getDebitNote: () => debitNoteData.GetInvoice,
        getDeliveryOrderTaxInvoice: () => deliveryOrderTaxInvoiceData.GetInvoice,
        getReceiptTaxInvoice: () => receiptTaxInvoiceData.GetInvoice,
    },
};

// Create an Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});