import axios from "axios";
import languages from "./languageAndItsCode";
import { useEffect, useState } from "react";

function App() {
  const [sourceText, setSourceText] = useState("Hello World");
  const [targetText, setTargetText] = useState("");
  const [targetid, setTargetid] = useState("hi");

  useEffect(() => {
    async function textTranslator() {
      const data = new FormData();
      data.append("source_language", `en`);
      data.append("target_language", `${targetid}`);
      data.append("text", `${sourceText}`);

      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "x-rapidapi-key":
            "9d7ebca7a3msh4288deb0c522a84p10cff0jsn1f828d60e5fb",
          "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        },
        data: data,
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setTargetText(response.data);
      } catch (error) {
        console.error(error);
        alert("no data found");
      }
    }
    textTranslator();
  }, [sourceText, targetid]);

  return (
    <>
      <select
        name="language"
        id=""
        onChange={(e) => setTargetid(e.target.value)}
      >
        {languages.map((lang, index) => {
          return (
            <option key={index} value={lang.id}>
              {lang.lang}
            </option>
          );
        })}
      </select>

      <textarea
        className="border-2"
        value={sourceText}
        onChange={(e) => {
          setSourceText(e.target.value);
        }}
      />

      <textarea className="border-2" value={targetText?.data?.translatedText} />
    </>
  );
}

export default App;