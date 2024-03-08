## KarzaOCR
Karza OCR API POC

## Steps to use this project -
1. Clone this project.
2. Create a .env file.
3. Add following keys in .env file a) KARZA_KEY, b) KARZA_TOKEN_GENERATE_URL, c) KARZA_OCR_API_URL.
4. You can generate your KARZA_KEY from https://api.totalkyc.com/profile. Add this key as a value to KARZA_KEY in .env file.
5. Run 'npm install'
6. Start the server by 'node server.js'.
7. From POSTMAN hit API http://localhost:3000/karza/karzaOCR 
8. For the above API following are the parameters to be sent via body-> form-data </br>
   <b>a) file - Upload your file of Document (Aadhaar, Driving Licence, PAN, Voter ID) in image (.png, .jpeg, .jpg) format. </br>
   b) maskAadhaar - boolean - true if the input is aadhaar and masked aadhaar image is required in the output. Allowed values: true, false. </br>
   c) hideAadhaar - boolean - true if the input is aadhaar and partially masked aadhaar number is required in the output. Allowed values: true, false. </br>
   d) conf - boolean - True if you need the OCR Confidence % against each value extracted. </br>
   e) docType - 'dl' string - The document type being captured for OCR. Allowed value: dl. </br>
   f) checkBlur - boolean - True if you need the quality (blur) score of the KYC card region. Returns a score in range of 0 (poor quality) to 100 (good quality).</br>
   h) checkBlackAndWhite - boolean - True to check if the KYC card is grayscale / photocopy. Returns boolean output.</br>
   i) checkCutCard - boolean - True to check if the KYC card is incomplete. Returns boolean output.</br>
   j) checkBrightness - boolean - True to get brightness value of the KYC card region. Returns boolean output. </b>
