"use client"
export const __useClient = true;
import React, { useState } from 'react';

function Components() {
  const [data, setData] = useState(0);

  const handleIncrease = () => {
    console.log("Clicked +");
    setData(prevData => prevData + 1);
  };

  const handleDecrease = () => {
    console.log("Clicked -");
    setData(prevData => prevData - 1);
  };

  return (
    <div className="component-container">
      <h1 style={{color:"blue", fontSize:"50px" , fontStyle:"italic"}}>Keycloak nedir?</h1>
      <br/>
       <p style={{color:"black", fontSize:"25px"}}> Keycloak, modern uygulamalara ve hizmetlere yönelik kimlik ve erişim yönetimi ile tek oturum açmaya olanak tanıyan açık kaynaklı bir yazılım ürünüdür.
       </p>
       <br/>
       <h1 style={{color:"blue" , fontSize:"50px" , fontStyle:"italic"}}> Keycloak'ın özellikleri nelerdir?</h1>
       <br/>       
       <h3 style={{color:"green" , fontSize:"30px" , fontStyle:"italic"}}> 1- Kimlik Doğrulama ve Yetkilendirme: </h3> 
       <p style={{color:"black", fontSize:"20px"}}>Keycloak, kullanıcıların kimliklerini doğrulamak ve onlara belirli erişim hakları atamak için OAuth 2.0, OpenID Connect ve SAML gibi standart protokolleri destekler.</p>
       <h3 style={{color:"green" , fontSize:"30px" , fontStyle:"italic"}}> 2- Tek Oturum Açma (SSO): </h3> 
       <p style={{color:"black", fontSize:"20px"}}>Birden fazla uygulamada tek bir oturum açma işlemi yapmayı sağlar. Kullanıcı bir kez oturum açtığında, diğer uygulamalara da aynı oturum bilgileriyle erişebilir.</p>
       <h3 style={{color:"green", fontSize:"30px" , fontStyle:"italic"}}> 3- Federasyon</h3>
       <p style={{color:"black" , fontSize:"20px"}}>Keycloak, LDAP veya Active Directory gibi mevcut kullanıcı dizinleriyle entegrasyon sağlar. Bu sayede, kullanıcı bilgilerini merkezi bir yerden yönetmek mümkün olur.</p>
       <h3 style={{color:"green", fontSize:"30px" , fontStyle:"italic"}}> 4- Sosyal Giriş</h3>
       <p style={{color:"black" , fontSize:"20px"}}>Google, Facebook, Twitter gibi sosyal medya hesapları üzerinden kimlik doğrulama yapmayı destekler.</p>
    </div>
  );
}

export default Components;