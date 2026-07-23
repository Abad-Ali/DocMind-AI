export const Verification_Email_Template = (verificationCode) => `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Verify Your Email - DocMind AI</title>

<style>

body {
    margin:0;
    padding:0;
    background:#030712;
    font-family:Arial, Helvetica, sans-serif;
    color:#ffffff;
}

.wrapper {
    width:100%;
    background:
    radial-gradient(circle at top,
    rgba(37,99,235,0.35),
    transparent 35%),
    linear-gradient(
    180deg,
    #111827 0%,
    #030712 100%
    );

    padding:40px 20px;
}

.container {

    max-width:620px;
    margin:auto;

    background:#0f172a;

    border-radius:24px;

    overflow:hidden;

    border:1px solid rgba(255,255,255,0.08);

    box-shadow:
    0 20px 60px rgba(0,0,0,0.5);

}


.header {

    text-align:center;

    padding:45px 30px;

    background:
    linear-gradient(
    135deg,
    rgba(37,99,235,0.25),
    rgba(124,58,237,0.18)
    );

}


.logo {

    width:72px;

    height:72px;

    margin-bottom:20px;

}


.brand {

    font-size:16px;

    color:#94a3b8;

    letter-spacing:1px;

    margin-bottom:15px;

}


.title {

    font-size:32px;

    font-weight:700;

    color:#ffffff;

    margin-bottom:12px;

}


.highlight {

    color:#3b82f6;

}


.description {

    color:#cbd5e1;

    line-height:1.7;

    font-size:15px;

}


.content {

    padding:35px;

}


.text {

    color:#e2e8f0;

    font-size:15px;

    line-height:1.8;

}


.code-container {

    margin:30px 0;

    padding:30px;

    background:

    rgba(255,255,255,0.05);

    border-radius:18px;

    border:1px solid rgba(59,130,246,0.35);

    text-align:center;

}


.code-label {

    color:#94a3b8;

    font-size:13px;

    text-transform:uppercase;

    letter-spacing:2px;

    margin-bottom:15px;

}


.code {

    font-size:38px;

    font-weight:700;

    letter-spacing:10px;

    color:#60a5fa;

}


.expire {

    margin-top:15px;

    color:#94a3b8;

    font-size:13px;

}


.notice {

    background:

    rgba(255,255,255,0.04);

    border-radius:14px;

    padding:20px;

    color:#cbd5e1;

    font-size:14px;

    line-height:1.7;

}


.button-wrapper {

    text-align:center;

    margin:35px 0 10px;

}


.button {

    display:inline-block;

    padding:14px 32px;

    background:#2563eb;

    color:#ffffff !important;

    text-decoration:none;

    border-radius:12px;

    font-weight:600;

}


.footer {

    padding:30px;

    text-align:center;

    border-top:1px solid rgba(255,255,255,0.08);

    color:#94a3b8;

    font-size:13px;

    line-height:1.8;

}


.footer a {

    color:#60a5fa;

    text-decoration:none;

}


@media(max-width:600px){

    .content{

        padding:25px;

    }


    .title{

        font-size:26px;

    }


    .code{

        font-size:28px;

        letter-spacing:6px;

    }

}

</style>

</head>


<body>


<div class="wrapper">


<div class="container">


<div class="header">


<img
class="logo"
src="https://docmind-ai-one.vercel.app/logo.png"
alt="DocMind AI Logo"
/>


<div class="brand">

DOCMIND AI

</div>


<div class="title">

Verify Your <span class="highlight">Email</span>

</div>


<div class="description">

Confirm your email address to start using
AI-powered document intelligence.

</div>


</div>



<div class="content">


<p class="text">

Hello,

</p>


<p class="text">

Thank you for creating your DocMind AI account.
Please use the verification code below to complete your registration.

</p>



<div class="code-container">


<div class="code-label">

Verification Code

</div>


<div class="code">

${verificationCode}

</div>


<div class="expire">

This code expires in 15 minutes.

</div>


</div>



<div class="notice">

If you did not create a DocMind AI account,
you can safely ignore this email.

</div>



<div class="button-wrapper">


<a
href="https://docmind-ai-one.vercel.app/"
class="button">

Visit DocMind AI

</a>


</div>


</div>



<div class="footer">


<strong style="color:#ffffff">

DocMind AI

</strong>


<br>


AI-powered document intelligence platform


<br><br>


<a href="https://docmind-ai-one.vercel.app/">

docmind-ai-one.vercel.app

</a>


<br><br>


© ${new Date().getFullYear()} DocMind AI.
All rights reserved.


</div>


</div>


</div>


</body>

</html>
`;



export const Welcome_Email_Template = (name) => `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Welcome to DocMind AI</title>


<style>

body{

margin:0;
padding:0;

background:#030712;

font-family:Arial,Helvetica,sans-serif;

color:white;

}


.wrapper{

width:100%;

padding:40px 20px;

background:

radial-gradient(
circle at top,
rgba(37,99,235,.35),
transparent 35%
),

linear-gradient(
180deg,
#111827,
#030712
);

}



.container{

max-width:620px;

margin:auto;

background:#0f172a;

border-radius:24px;

overflow:hidden;

border:1px solid rgba(255,255,255,.08);

box-shadow:

0 20px 60px rgba(0,0,0,.5);

}




.header{


padding:45px 30px;

text-align:center;


background:

linear-gradient(
135deg,
rgba(37,99,235,.25),
rgba(124,58,237,.18)
);


}




.logo{

width:72px;

height:72px;

margin-bottom:20px;

}



.brand{

font-size:16px;

letter-spacing:2px;

color:#94a3b8;

margin-bottom:15px;

}



.title{

font-size:32px;

font-weight:700;

margin-bottom:12px;

}



.blue{

color:#3b82f6;

}



.subtitle{

color:#cbd5e1;

font-size:15px;

line-height:1.8;

}



.content{

padding:35px;

}



.text{

color:#e2e8f0;

font-size:15px;

line-height:1.8;

}



.feature-title{

font-size:20px;

font-weight:700;

margin:

35px 0 20px;

color:#ffffff;

}



.card{


background:

rgba(255,255,255,.05);


border:

1px solid rgba(255,255,255,.08);


border-radius:16px;


padding:22px;


margin-bottom:15px;


}



.card-title{


color:#60a5fa;


font-size:17px;


font-weight:600;


margin-bottom:8px;


}



.card-text{


color:#cbd5e1;


font-size:14px;


line-height:1.7;


}




.button-wrapper{

text-align:center;

margin:35px 0;

}



.button{


display:inline-block;

background:#2563eb;

padding:14px 34px;

border-radius:12px;

color:#ffffff!important;

text-decoration:none;

font-weight:600;

}




.footer{


padding:30px;


text-align:center;


border-top:

1px solid rgba(255,255,255,.08);


font-size:13px;


color:#94a3b8;


line-height:1.8;


}



.footer a{

color:#60a5fa;

text-decoration:none;

}




@media(max-width:600px){

.content{

padding:25px;

}


.title{

font-size:26px;

}

}


</style>


</head>


<body>


<div class="wrapper">


<div class="container">



<div class="header">


<img

src="https://docmind-ai-one.vercel.app/logo.png"

class="logo"

alt="DocMind AI Logo"

/>



<div class="brand">

DOCMIND AI

</div>



<div class="title">

Welcome to <span class="blue">DocMind AI</span>

</div>



<div class="subtitle">

Your intelligent workspace for understanding,
summarizing, and analyzing documents with AI.

</div>



</div>




<div class="content">



<p class="text">

Hello <strong>${name}</strong>,

</p>



<p class="text">

Your DocMind AI account has been created successfully.
You can now start transforming complex documents into clear,
useful insights using artificial intelligence.

</p>




<div class="feature-title">

What you can do with DocMind AI

</div>




<div class="card">


<div class="card-title">

AI Document Summaries

</div>


<div class="card-text">

Upload your PDF documents and receive clear,
AI-generated summaries that highlight important information.

</div>


</div>





<div class="card">


<div class="card-title">

Smart Questions and Answers

</div>


<div class="card-text">

Generate meaningful questions and answers from your documents
to improve learning and understanding.

</div>


</div>





<div class="card">


<div class="card-title">

Faster Document Understanding

</div>


<div class="card-text">

Save hours of reading by allowing AI to extract,
organize, and explain important details.

</div>


</div>





<div class="card">


<div class="card-title">

Secure Document Experience

</div>


<div class="card-text">

Your documents are handled with privacy and security
while you use powerful AI features.

</div>


</div>





<div class="button-wrapper">


<a

href="https://docmind-ai-one.vercel.app/"

class="button">

Visit DocMind AI

</a>


</div>




<p class="text">

We are excited to have you with us.
Explore the power of AI and make your documents work smarter.

</p>



</div>





<div class="footer">


<strong style="color:white">

DocMind AI

</strong>


<br>


AI-powered document intelligence platform


<br><br>


<a href="https://docmind-ai-one.vercel.app/">

docmind-ai-one.vercel.app

</a>


<br><br>


© ${new Date().getFullYear()} DocMind AI.
All rights reserved.


</div>



</div>


</div>


</body>


</html>
`;



export const AI_Summary_AND_QA_Email_Template = ({
  userName,
  pdfTitle,
  summary,
  questions,
}) => `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Your AI Analysis - DocMind AI</title>


<style>

body{

margin:0;
padding:0;

background:#030712;

font-family:Arial,Helvetica,sans-serif;

color:white;

}



.wrapper{

width:100%;

padding:40px 20px;

background:

radial-gradient(
circle at top,
rgba(37,99,235,.35),
transparent 35%
),

linear-gradient(
180deg,
#111827,
#030712
);

}




.container{

max-width:620px;

margin:auto;

background:#0f172a;

border-radius:24px;

overflow:hidden;

border:

1px solid rgba(255,255,255,.08);


box-shadow:

0 20px 60px rgba(0,0,0,.5);

}




.header{

padding:45px 30px;

text-align:center;


background:

linear-gradient(

135deg,

rgba(37,99,235,.25),

rgba(124,58,237,.18)

);

}



.logo{

width:72px;

height:72px;

margin-bottom:20px;

}



.brand{

font-size:16px;

letter-spacing:2px;

color:#94a3b8;

margin-bottom:15px;

}




.title{

font-size:32px;

font-weight:700;

margin-bottom:12px;

}



.blue{

color:#3b82f6;

}



.subtitle{

color:#cbd5e1;

font-size:15px;

line-height:1.8;

}




.content{

padding:35px;

}




.text{

font-size:15px;

line-height:1.8;

color:#e2e8f0;

}




.document-card{


margin:30px 0;


padding:22px;


background:

rgba(255,255,255,.05);


border:

1px solid rgba(255,255,255,.08);


border-radius:18px;


}



.document-label{


font-size:12px;

letter-spacing:2px;

text-transform:uppercase;

color:#94a3b8;

margin-bottom:10px;


}




.document-title{


font-size:20px;

font-weight:700;

color:white;

word-break:break-word;

}




.section-title{


margin:

35px 0 18px;


font-size:21px;


font-weight:700;


color:#60a5fa;


}





.summary-card{


background:

rgba(37,99,235,.08);


border-left:

4px solid #2563eb;


padding:22px;


border-radius:16px;


color:#e2e8f0;


font-size:15px;


line-height:1.9;


}




.question-card{


background:

rgba(255,255,255,.05);


border:

1px solid rgba(255,255,255,.08);


border-radius:16px;


padding:22px;


margin-bottom:18px;


}




.question{


font-size:16px;


font-weight:700;


color:#60a5fa;


margin-bottom:12px;


}




.answer{


font-size:14px;


line-height:1.8;


color:#cbd5e1;


}




.button-wrapper{


text-align:center;


margin:40px 0 20px;


}





.button{


display:inline-block;


padding:14px 34px;


background:#2563eb;


border-radius:12px;


color:white!important;


text-decoration:none;


font-weight:600;


}





.footer{


padding:30px;


text-align:center;


border-top:

1px solid rgba(255,255,255,.08);


font-size:13px;


line-height:1.8;


color:#94a3b8;


}




.footer a{


color:#60a5fa;


text-decoration:none;


}





@media(max-width:600px){


.content{

padding:25px;

}



.title{

font-size:26px;

}



}

</style>


</head>


<body>


<div class="wrapper">


<div class="container">



<div class="header">


<img

src="https://docmind-ai-one.vercel.app/logo.png"

class="logo"

alt="DocMind AI Logo"

/>




<div class="brand">

DOCMIND AI

</div>




<div class="title">

Your AI Analysis is <span class="blue">Ready</span>

</div>




<div class="subtitle">

Your document has been successfully analyzed
using DocMind AI.

</div>



</div>





<div class="content">



<p class="text">

Hello <strong>${userName}</strong>,

</p>




<p class="text">

Your PDF has been processed successfully.
Below you can find the AI-generated summary
and important questions created from your document.

</p>





<div class="document-card">


<div class="document-label">

Document Analyzed

</div>


<div class="document-title">

${pdfTitle}

</div>


</div>





<div class="section-title">

AI Summary

</div>




<div class="summary-card">

${summary}

</div>






<div class="section-title">

Questions and Answers

</div>





${questions.map((q,index)=>`

<div class="question-card">


<div class="question">

${index + 1}. ${q.question}

</div>



<div class="answer">

${q.answer}

</div>



</div>


`).join("")}







<div class="button-wrapper">


<a

href="https://docmind-ai-one.vercel.app/"

class="button">

Visit DocMind AI

</a>


</div>





<p class="text">

Continue exploring your documents and
discover more AI-powered insights with DocMind AI.

</p>




</div>





<div class="footer">


<strong style="color:white">

DocMind AI

</strong>


<br>


AI-powered document intelligence platform


<br><br>


<a href="https://docmind-ai-one.vercel.app/">

docmind-ai-one.vercel.app

</a>


<br><br>


© ${new Date().getFullYear()} DocMind AI.
All rights reserved.


</div>





</div>


</div>


</body>


</html>
`;