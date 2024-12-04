/* eslint-disable */
import React, { useState } from "react";

import { RSA, ComputeMd5Hash } from "./rsa";

import "./App.scss";
import FileUploader from "./FileUploader";
import SaveTextToFile from "./SaveTextToFile";
const App = () => {
  const [rsa] = useState(new RSA());
  const [textToSign, setTextToSign] = useState("");
  const [signedText, setSignedText] = useState("");
  const [hashFunction, setHashFunction] = useState("");
  const [signature, setSignature] = useState("");
  const [verificationText, setVerificationText] = useState("");
  const [verificationSignature, setVerificationSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [notification, setNotification] = useState("");

  //hàm ký
  const handleSign = () => {
    const hash = ComputeMd5Hash(textToSign);
    setHashFunction(hash);
    const signed = rsa.MaHoa(hash);
    setSignature(signed);
    setSignedText(textToSign);
  };

  //hàm chuyển
  const convert = () => {
    setVerificationText(textToSign);
    setVerificationSignature(signature);
    setVerificationResult(hashFunction);
  };

  //hàm kiểm tra chữ ký
  const handleVerify = () => {
    const hash = ComputeMd5Hash(verificationText);
    setVerificationResult(hash);
    try {
      const decryptedHash = rsa.GiaiMa(verificationSignature);
      if (signedText !== verificationText) {
        setNotification("Văn bản ký không hợp lệ");
      } else {
        if (hash === decryptedHash && verificationSignature === signature) {
          setNotification("Chữ ký hợp lệ");
        } else if (
          hash !== decryptedHash ||
          verificationSignature !== signature
        ) {
          setNotification("Chữ ký không hợp lệ");
        }
      }
    } catch (error) {
      setNotification("Chữ ký không hợp lệ");
    }
  };

  return (
    <div className="app">
      <div className="digitalSignatures">
        <p className="tt">CHỮ KÝ SỐ</p>
        <div className="signature">
          <div className="generatedSignature">
            <p className="title">Phát sinh chữ ký</p>
            <div className="group">
              <p>Văn bản ký</p>
              <textarea
                value={textToSign}
                onChange={(e) => setTextToSign(e.target.value)}
              />
              <FileUploader
                title="File"
                onFileChange={(uploadContent) => {
                  setTextToSign(uploadContent);
                }}
              />
            </div>

            <div className="bt-sign">
              <button onClick={handleSign}>Ký</button>
            </div>

            <div className="gr-hashFunction">
              <p>Giá trị băm</p>
              <textarea value={hashFunction} readOnly />
            </div>

            <div className="group">
              <p>Chữ ký</p>
              <textarea value={signature} readOnly />
              <div className="gr-btn">
                <button className="btn1" onClick={convert}>
                  Chuyển
                </button>
                <SaveTextToFile content={signature} />
              </div>
            </div>
          </div>

          <div className="checkSignature">
            <p className="title">Kiểm tra chữ ký</p>

            <div className="group">
              <p>Văn bản ký</p>
              <textarea
                value={verificationText}
                onChange={(e) => setVerificationText(e.target.value)}
              />
              <FileUploader
                title="File văn bản"
                onFileChange={(uploadContent) => {
                  setVerificationText(uploadContent);
                }}
              />
            </div>

            <div className="bt-sign">
              <button onClick={handleVerify}>Kiểm tra chữ kí</button>
            </div>
            <div className="group">
              <p>Chữ ký</p>
              <textarea
                value={verificationSignature}
                onChange={(e) => setVerificationSignature(e.target.value)}
              />
              <FileUploader
                title="File chữ ký"
                onFileChange={(uploadContent) => {
                  setVerificationSignature(uploadContent);
                }}
              />
            </div>

            <div className="gr-hashFunction">
              <p>Giá trị băm</p>
              <textarea value={verificationResult} readOnly />
            </div>

            <div className="gr-hashFunction">
              <p>Thông báo</p>
              <div
                className={`noti ${
                  notification === "Chữ ký hợp lệ" ? "green" : "red"
                }`}
              >
                {notification}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
