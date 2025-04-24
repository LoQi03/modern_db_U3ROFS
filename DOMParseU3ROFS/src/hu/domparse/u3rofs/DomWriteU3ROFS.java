package hu.domparse.u3rofs;

import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import java.util.StringJoiner;

public class DomWriteU3ROFS {
    public static void WriteElementsToFileAndConsole() {
        try {
            // Előkészítjük a dokumentumot
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            // Ez a dokumentumépítő példányok létrehozására szolgál
            DocumentBuilder builder = factory.newDocumentBuilder();
            // Ez a dokumentum építésére szolgál
            Document doc = builder.newDocument();
            // Root Element létrehozása
            Element rootElement = doc.createElement("U3ROFS_Autosiskolak");
            rootElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
            rootElement.setAttribute("xsi:noNamespaceSchemaLocation", "XMLSchemaU3ROFS.xsd");
            doc.appendChild(rootElement);
            // Autosiskolak létrehozása
            addAutosiskola(doc, rootElement, "1", "Go Car", "1111 Budapest, Kossuth Lajos utca 1.",
                    Arrays.asList("06-70-123-4567", "06-30-123-4567"));
            addAutosiskola(doc, rootElement, "2", "Guruljunk", "1111 Budapest, Petőfi utca 2.",
                    Arrays.asList("06-70-123-4567"));
            addAutosiskola(doc, rootElement, "3", "UNI", "3515, Miskolc, Egyetem út 1",
                    Arrays.asList("06-70-123-4567", "06-30-123-4567"));
            // Ugyfel létrehozása
            addUgyfel(doc, rootElement, "1", "1", "1", "Nagy", "Máté",
                    Arrays.asList("06-70-123-4567", "06-30-123-4567"), "18", "2003-01-01");
            addUgyfel(doc, rootElement, "2", "2", "2", "Gyáni", "Kevin", Arrays.asList("06-70-123-4567"), "18",
                    "2003-01-01");
            addUgyfel(doc, rootElement, "3", "3", "3", "Kovács", "Ádám",
                    Arrays.asList("06-70-123-4567", "06-30-123-4567"), "18", "2003-01-01");
            // Oktato létrehozása
            addOktato(doc, rootElement, "1", "1", "Kovács János", "300000",
                    Arrays.asList("06-70-123-4567", "06-30-123-4567"));
            addOktato(doc, rootElement, "2", "2", "Kiss János", "300000", Arrays.asList("06-70-123-4567"));
            addOktato(doc, rootElement, "3", "3", "Nagy János", "300000",
                    Arrays.asList("06-70-123-4567", "06-30-123-4567"));
            // Auto létrehozása
            addAuto(doc, rootElement, "1", "1", "ABC-111", "Astra", "Opel");
            addAuto(doc, rootElement, "2", "2", "ABC-222", "Focus", "Ford");
            addAuto(doc, rootElement, "3", "3", "ABC-333", "Corolla", "Toyota");
            // Szerelo létrehozása
            addSzerelo(doc, rootElement, "1", "1", "Kovács Abdul", "400000",
                    Arrays.asList("06-70-123-1111", "06-30-123-1112"));
            addSzerelo(doc, rootElement, "2", "2", "Kiss Adorján", "420000", Arrays.asList("06-70-123-2222"));
            addSzerelo(doc, rootElement, "3", "3", "Nagy Ferenc", "450000",
                    Arrays.asList("06-70-123-3333", "06-30-123-3334"));

            // Cserealkatreszek létrehozása
            addCserealkatreszek(doc, rootElement, "1", "1", Arrays.asList("fékbetét", "féktárcsa"));
            addCserealkatreszek(doc, rootElement, "2", "2", Arrays.asList("motor", "lengőkar"));
            addCserealkatreszek(doc, rootElement, "3", "3", Arrays.asList("szélvédő"));

            // Dokumentum mentése
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty("{https://xml.apache.org/xslt}indent-amount", "2");

            printDocument(doc);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void addAutosiskola(Document doc, Element rootElement, String ai_id, String nev, String cim,
            List<String> telefonok) {
        Element autosiskola = doc.createElement("Autosiskola");
        autosiskola.setAttribute("ai_id", ai_id);

        Element nevElement = createElement(doc, "nev", nev);
        Element cimElement = createElement(doc, "cim", cim);
        autosiskola.appendChild(nevElement);
        autosiskola.appendChild(cimElement);

        for (String telefon : telefonok) {
            Element telefonElement = createElement(doc, "telefon", telefon);
            autosiskola.appendChild(telefonElement);
        }

        rootElement.appendChild(autosiskola);
    }

    private static void addUgyfel(Document doc, Element rootElement, String u_id, String ai_id, String o_id,
            String vezeteknev, String keresztnev, List<String> telefonok, String kor, String szuletesiDatum) {
        Element ugyfel = doc.createElement("Ugyfel");
        ugyfel.setAttribute("u_id", u_id);
        ugyfel.setAttribute("ai_id", ai_id);
        ugyfel.setAttribute("o_id", o_id);

        Element nevElement = doc.createElement("nev");
        Element vezeteknevElement = createElement(doc, "vezeteknev", vezeteknev);
        Element keresztnevElement = createElement(doc, "keresztnev", keresztnev);
        nevElement.appendChild(vezeteknevElement);
        nevElement.appendChild(keresztnevElement);

        ugyfel.appendChild(nevElement);

        for (String telefon : telefonok) {
            Element telefonElement = createElement(doc, "telefon", telefon);
            ugyfel.appendChild(telefonElement);
        }

        Element korElement = createElement(doc, "kor", kor);
        Element szuletesiDatumElement = createElement(doc, "szuletesi_datum", szuletesiDatum);

        ugyfel.appendChild(korElement);
        ugyfel.appendChild(szuletesiDatumElement);

        rootElement.appendChild(ugyfel);
    }

    private static void addOktato(Document doc, Element rootElement, String o_id, String ai_id, String nev,
            String fizetes, List<String> telefonok) {
        Element oktato = doc.createElement("Oktato");
        oktato.setAttribute("o_id", o_id);
        oktato.setAttribute("ai_id", ai_id);

        Element nevElement = createElement(doc, "nev", nev);
        Element fizetesElement = createElement(doc, "fizetes", fizetes);

        oktato.appendChild(nevElement);
        oktato.appendChild(fizetesElement);

        for (String telefon : telefonok) {
            Element telefonElement = createElement(doc, "telefon", telefon);
            oktato.appendChild(telefonElement);
        }

        rootElement.appendChild(oktato);
    }

    private static void addAuto(Document doc, Element rootElement, String au_id, String o_id, String rendszam,
            String tipus, String marka) {
        Element auto = doc.createElement("Auto");
        auto.setAttribute("au_id", au_id);
        auto.setAttribute("o_id", o_id);

        Element rendszamElement = createElement(doc, "rendszam", rendszam);
        Element tipusElement = createElement(doc, "tipus", tipus);
        Element markaElement = createElement(doc, "marka", marka);

        auto.appendChild(rendszamElement);
        auto.appendChild(tipusElement);
        auto.appendChild(markaElement);

        rootElement.appendChild(auto);
    }

    private static void addSzerelo(Document doc, Element rootElement, String sz_id, String au_id, String nev,
            String fizetes, List<String> telefonok) {
        Element szerelo = doc.createElement("Szerelo");
        szerelo.setAttribute("sz_id", sz_id);
        szerelo.setAttribute("au_id", au_id);

        Element nevElement = createElement(doc, "nev", nev);
        Element fizetesElement = createElement(doc, "fizetes", fizetes);

        szerelo.appendChild(nevElement);
        szerelo.appendChild(fizetesElement);

        for (String telefon : telefonok) {
            Element telefonElement = createElement(doc, "telefon", telefon);
            szerelo.appendChild(telefonElement);
        }

        rootElement.appendChild(szerelo);
    }

    private static void addCserealkatreszek(Document doc, Element rootElement, String au_id, String sz_id,
            List<String> alkatreszek) {
        Element cserealkatreszek = doc.createElement("cserealkatreszek");
        cserealkatreszek.setAttribute("au_id", au_id);
        cserealkatreszek.setAttribute("sz_id", sz_id);

        for (String alkatresz : alkatreszek) {
            Element alkatreszElement = createElement(doc, "cserealkatresz", alkatresz);
            cserealkatreszek.appendChild(alkatreszElement);
        }

        rootElement.appendChild(cserealkatreszek);
    }

    private static void printDocument(Document doc) {
        try {
            // Fájlba írás
            File outputFile = new File("XML_U3ROFS3.xml");
            // Írás a konzolra
            PrintWriter writer = new PrintWriter(new FileWriter(outputFile, true));
            // Kiírja az XML főgyökér elemét a konzolra és fájlba
            Element rootElement = doc.getDocumentElement();
            String rootName = rootElement.getTagName();
            // A gyökér elem attribútumainak kiírása
            StringJoiner rootAttributes = new StringJoiner(" ");
            // A gyökér elem attribútumainak lekérése
            NamedNodeMap rootAttributeMap = rootElement.getAttributes();

            for (int i = 0; i < rootAttributeMap.getLength(); i++) {
                Node attribute = rootAttributeMap.item(i);
                rootAttributes.add(attribute.getNodeName() + "=\"" + attribute.getNodeValue() + "\"");
            }

            System.out.print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            writer.print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");

            System.out.print("<" + rootName + " " + rootAttributes.toString() + ">\n");
            writer.print("<" + rootName + " " + rootAttributes.toString() + ">\n");
            // A gyökér elem alatti elemek lekérése
            NodeList autosiskolaList = doc.getElementsByTagName("Autosiskola");
            NodeList ugyfelList = doc.getElementsByTagName("Ugyfel");
            NodeList oktatoList = doc.getElementsByTagName("Oktato");
            NodeList autoList = doc.getElementsByTagName("Auto");
            NodeList szereloList = doc.getElementsByTagName("Szerelo");
            NodeList cserealkatreszekList = doc.getElementsByTagName("cserealkatreszek");

            printNodeList(autosiskolaList, writer);
            System.out.println("");
            writer.println("");
            printNodeList(ugyfelList, writer);
            System.out.println("");
            writer.println("");
            printNodeList(oktatoList, writer);
            System.out.println("");
            writer.println("");
            printNodeList(autoList, writer);
            System.out.println("");
            writer.println("");
            printNodeList(szereloList, writer);
            System.out.println("");
            writer.println("");
            printNodeList(cserealkatreszekList, writer);

            System.out.println("</" + rootName + ">");
            writer.append("</" + rootName + ">");

            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void printNodeList(NodeList nodeList, PrintWriter writer) {
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            printNode(node, 1, writer);
            System.out.println("");
            writer.println("");
        }
    }

    private static void printNode(Node node, int indent, PrintWriter writer) {
        // Ha az elem típusa ELEMENT_NODE, akkor kiírjuk az elem nevét és attribútumait
        if (node.getNodeType() == Node.ELEMENT_NODE) {
            Element element = (Element) node;
            String nodeName = element.getTagName();
            StringJoiner attributes = new StringJoiner(" ");
            NamedNodeMap attributeMap = element.getAttributes();
            // Kiírjuk az elem nevét és attribútumait
            for (int i = 0; i < attributeMap.getLength(); i++) {
                Node attribute = attributeMap.item(i);
                attributes.add(attribute.getNodeName() + "=\"" + attribute.getNodeValue() + "\"");
            }

            // Kiírjuk az elem nevét és attribútumait
            System.out.print(getIndentString(indent));
            System.out.print("<" + nodeName + " " + attributes.toString() + ">");

            writer.print(getIndentString(indent));
            writer.print("<" + nodeName + " " + attributes.toString() + ">");

            NodeList children = element.getChildNodes();
            if (children.getLength() == 1 && children.item(0).getNodeType() == Node.TEXT_NODE) {
                System.out.print(children.item(0).getNodeValue());
                writer.print(children.item(0).getNodeValue());
            } else {
                System.out.println();
                writer.println();
                for (int i = 0; i < children.getLength(); i++) {
                    printNode(children.item(i), indent + 1, writer);
                }
                System.out.print(getIndentString(indent));
                writer.print(getIndentString(indent));
            }
            System.out.println("</" + nodeName + ">");
            writer.println("</" + nodeName + ">");
        }
    }

    private static Element createElement(Document doc, String name, String value) {
        Element element = doc.createElement(name);
        element.appendChild(doc.createTextNode(value));
        return element;
    }

    private static String getIndentString(int indent) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < indent; i++) {
            sb.append("  ");
        }
        return sb.toString();
    }
}
