import hu.domparse.u3rofs.DomModifyU3ROFS;
import hu.domparse.u3rofs.DomQueryU3ROFS;
import hu.domparse.u3rofs.DomReadU3ROFS;
import hu.domparse.u3rofs.DomWriteU3ROFS;

public class Main {
    public static void main(String[] args) {
        // RootElement beolvasása
       // DomReadU3ROFS.ReadXMLDocument("XMLTAskU3ROFS\\DOMParseU3ROFS\\src\\XML_U3ROFS.xml");
        // Elementek módosítása
        //DomModifyU3ROFS.ModifyElement("XMLTAskU3ROFS\\DOMParseU3ROFS\\src\\XML_U3ROFS.xml");
        // Elemek kiírása
        //DomWriteU3ROFS.WriteElementsToFileAndConsole();
        // Elementek lekérdezése
        DomQueryU3ROFS.QueryPrescribedDetails("XMLTAskU3ROFS\\DOMParseU3ROFS\\src\\XML_U3ROFS.xml");
    }
}