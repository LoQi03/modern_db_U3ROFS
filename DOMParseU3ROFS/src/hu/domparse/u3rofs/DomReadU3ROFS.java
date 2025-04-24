package hu.domparse.u3rofs;

import org.w3c.dom.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.*;
import java.io.*;
import java.util.StringJoiner;

public class DomReadU3ROFS {
    public static void ReadXMLDocument(String filePath) {
        try {
            // Fájl beolvasása
            File inputFile = new File(filePath);
            // Ez létrehoz egy singleton objektumot, amely lehetővé teszi a dokumentumok
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            // Ez a dokumentumépítő példányok létrehozására szolgál
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();
            printDocument(doc);
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
    }

    private static void printDocument(Document doc) {
        try {
            File outputFile = new File("XML_U3ROFS1.xml");
            PrintWriter writer = new PrintWriter(new FileWriter(outputFile, true));

            // Kiírjuk az XML főgyökér elemét a konzolra és fájlba
            Element rootElement = doc.getDocumentElement();
            String rootName = rootElement.getTagName();
            StringJoiner rootAttributes = new StringJoiner(" ");
            NamedNodeMap rootAttributeMap = rootElement.getAttributes();

            for (int i = 0; i < rootAttributeMap.getLength(); i++) {
                Node attribute = rootAttributeMap.item(i);
                rootAttributes.add(attribute.getNodeName() + "=\"" + attribute.getNodeValue() + "\"");
            }

            System.out.print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            writer.print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");

            System.out.print("<" + rootName + " " + rootAttributes.toString() + ">\n");
            writer.print("<" + rootName + " " + rootAttributes.toString() + ">\n");

            NodeList autosiskolaList = doc.getElementsByTagName("Autosiskola");
            NodeList ugyfelList = doc.getElementsByTagName("Ugyfel");
            NodeList oktatoList = doc.getElementsByTagName("Oktato");
            NodeList autoList = doc.getElementsByTagName("Auto");
            NodeList szereloList = doc.getElementsByTagName("Szerelo");
            NodeList cserealkatreszekList = doc.getElementsByTagName("cserealkatreszek");

            // Kiírjuk az XML-t a konzolra megtartva az eredeti formázást
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

            // Zárjuk le az XML gyökér elemét
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
        // Ha a node egy szöveg node, akkor kiírjuk a tartalmát
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
            // Kiírjuk az elem tartalmát
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

    private static String getIndentString(int indent) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < indent; i++) {
            // A szóközök száma, amivel indentálunk
            sb.append("  ");
        }
        return sb.toString();
    }
}
