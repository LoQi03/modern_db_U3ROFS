package hu.domparse.u3rofs;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;

public class DomQueryU3ROFS {

    public static void QueryPrescribedDetails(String filePath) {
        Document doc = null;
        try {
            // Fájl beolvasása
            File inputFile = new File(filePath);
            // Ez létrehoz egy singleton objektumot, amely lehetővé teszi a dokumentumok
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            // Ez a dokumentumépítő példányok létrehozására szolgál
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Új szakasz kezdete a konzolon
        System.out.println();
        // Kiírja, hogy "Összes autósiskola:"
        System.out.println("Összes autósiskola:");
        // Lekéri az összes "Autosiskola" elemet az XML-ből
        NodeList autosiskolaList = doc.getElementsByTagName("Autosiskola");
        // Végigmegy az összes autósiskola elemen
        for (int i = 0; i < autosiskolaList.getLength(); i++) {
            Node node = autosiskolaList.item(i);
            // Ellenőrzi, hogy az elem tényleg elem típusú-e (nem szöveg vagy komment)
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element autosiskola = (Element) node;
                // Kiírja az autósiskola ID-ját és nevét
                System.out.println("Autosiskola ID: " + autosiskola.getAttribute("ai_id"));
                System.out.println("Név: " + autosiskola.getElementsByTagName("nev").item(0).getTextContent());
            }
        }

        // Új szakasz kezdete a konzolon
        System.out.println();
        // Kiírja, hogy "Összes Ugyfel adatainak kiíratása, akik egy bizonyos
        // Autosiskola-hoz tartoznak"
        System.out.println("Összes Ugyfel adatainak kiíratása, akik egy bizonyos Autosiskola-hoz tartoznak");
        // Lekéri az összes "Ugyfel" elemet az XML-ből
        NodeList ugyfelList = doc.getElementsByTagName("Ugyfel");
        // Végigmegy az összes ügyfél elemen
        for (int i = 0; i < ugyfelList.getLength(); i++) {
            Node node = ugyfelList.item(i);
            // Ellenőrzi, hogy az elem tényleg elem típusú-e és az "ai_id" attribútum értéke
            // "1"
            if (node.getNodeType() == Node.ELEMENT_NODE && "2".equals(((Element) node).getAttribute("ai_id"))) {
                Element ugyfel = (Element) node;
                // Kiírja az ügyfél nevét
                System.out.println("Ügyfél név: " + ugyfel.getElementsByTagName("nev").item(0).getTextContent());
            }
        }

        // Új szakasz kezdete a konzolon
        System.out.println();
        // Kiírja, hogy "Azoknak az Oktato-knak a neve és fizetése, akik bizonyos
        // Autosiskola-ban tanítanak"
        System.out.println("Azoknak az Oktato-knak a neve és fizetése, akik bizonyos Autosiskola-ban tanítanak");
        // Lekéri az összes "Oktato" elemet az XML-ből
        NodeList oktatoList = doc.getElementsByTagName("Oktato");
        // Végigmegy az összes oktató elemen
        for (int i = 0; i < oktatoList.getLength(); i++) {
            Node node = oktatoList.item(i);
            // Ellenőrzi, hogy az elem tényleg elem típusú-e és az "ai_id" attribútum értéke
            // "1"
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element oktato = (Element) node;
                if ("2".equals(oktato.getAttribute("ai_id"))) {
                    // Kiírja az oktató nevét és fizetését
                    System.out.println("Oktató neve: " + oktato.getElementsByTagName("nev").item(0).getTextContent());
                    System.out.println("Fizetése: " + oktato.getElementsByTagName("fizetes").item(0).getTextContent());
                }
            }
        }

        // Új szakasz kezdete a konzolon
        System.out.println();
        // Kiírja, hogy "Az Auto elemek rendszam, tipus, és marka adatainak kiíratása"
        System.out.println("Az Auto elemek rendszam, tipus, és marka adatainak kiíratása");
        // Lekéri az összes "Auto" elemet az XML-ből
        NodeList autoList = doc.getElementsByTagName("Auto");
        // Végigmegy az összes auto elemen
        for (int i = 0; i < autoList.getLength(); i++) {
            Node node = autoList.item(i);
            // Ellenőrzi, hogy az elem tényleg elem típusú-e
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element auto = (Element) node;
                // Kiírja az auto rendszámát, típusát, és márkáját
                System.out.println("Rendszám: " + auto.getElementsByTagName("rendszam").item(0).getTextContent());
                System.out.println("Típus: " + auto.getElementsByTagName("tipus").item(0).getTextContent());
                System.out.println("Márka: " + auto.getElementsByTagName("marka").item(0).getTextContent());
            }
        }
        // Új szakasz kezdete a konzolon
        System.out.println();
        // Kiírja, hogy "Szerelők és az általuk szerelt autók, valamint a cserélt
        // alkatrészek:"
        System.out.println("Szerelők és az általuk szerelt autók, valamint a cserélt alkatrészek:");

        // Lekéri az összes "Szerelo" elemet az XML-ből
        NodeList szereloList = doc.getElementsByTagName("Szerelo");
        for (int i = 0; i < szereloList.getLength(); i++) {
            Node szereloNode = szereloList.item(i);
            // Ellenőrzi, hogy az elem tényleg elem típusú-e
            if (szereloNode.getNodeType() == Node.ELEMENT_NODE) {
                Element szerelo = (Element) szereloNode;
                // Kiírja a szerelő nevét és az autó ID-ját, amit szerelt
                String szereloNev = szerelo.getElementsByTagName("nev").item(0).getTextContent();
                String autoId = szerelo.getAttribute("au_id");

                System.out.println("Szerelő neve: " + szereloNev);
                System.out.println("Szerelt Auto ID: " + autoId);

                // Lekéri az összes "Auto" elemet az XML-ből
                for (int j = 0; j < autoList.getLength(); j++) {
                    Node autoNode = autoList.item(j);
                    // Ellenőrzi, hogy az elem tényleg elem típusú-e és az auto ID egyezik-e
                    if (autoNode.getNodeType() == Node.ELEMENT_NODE
                            && autoId.equals(((Element) autoNode).getAttribute("au_id"))) {
                        Element auto = (Element) autoNode;
                        // Kiírja az autó rendszámát, típusát és márkáját
                        System.out.println(
                                "Auto Rendszám: " + auto.getElementsByTagName("rendszam").item(0).getTextContent());
                        System.out
                                .println("Auto Típus: " + auto.getElementsByTagName("tipus").item(0).getTextContent());
                        System.out
                                .println("Auto Márka: " + auto.getElementsByTagName("marka").item(0).getTextContent());
                    }
                }

                // Lekéri az összes "cserealkatreszek" elemet az XML-ből
                NodeList cserealkatreszekList = doc.getElementsByTagName("cserealkatreszek");
                for (int k = 0; k < cserealkatreszekList.getLength(); k++) {
                    Node cserealkatreszekNode = cserealkatreszekList.item(k);
                    // Ellenőrzi, hogy az elem tényleg elem típusú-e és az auto ID egyezik-e
                    if (cserealkatreszekNode.getNodeType() == Node.ELEMENT_NODE
                            && autoId.equals(((Element) cserealkatreszekNode).getAttribute("au_id"))) {
                        Element cserealkatreszek = (Element) cserealkatreszekNode;
                        NodeList alkatresek = cserealkatreszek.getElementsByTagName("cserealkatresz");
                        System.out.println("Cserélt alkatrészek:");
                        // Végigmegy a cserélt alkatrészek listáján
                        for (int l = 0; l < alkatresek.getLength(); l++) {
                            Node alkatresz = alkatresek.item(l);
                            // Ellenőrzi, hogy az elem tényleg elem típusú-e
                            if (alkatresz.getNodeType() == Node.ELEMENT_NODE) {
                                // Kiírja az alkatrész nevét
                                System.out.println(" - " + alkatresz.getTextContent());
                            }
                        }
                    }
                }
                // Új szakasz a konzolon
                System.out.println();
            }
        }
    }
}
