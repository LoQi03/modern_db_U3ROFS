# XML

[Jegyzőkönyv](./U3ROFS_Jegyzokonyv.pdf)

# MongoDb

# Oktatói Adatbázis Kezelő

Ez a projekt egy Next.js alapú webalkalmazás, amely MongoDB-t használ adatbázisként. Az alkalmazás célja, hogy egy vezetési iskolákhoz kapcsolódó adatbázist kezeljen, amely tartalmazza az oktatók, autósiskolák és ügyfelek adatait. Az alkalmazás lehetővé teszi az adatok létrehozását, szerkesztését, törlését és keresését.

## Főbb funkciók
- **Oktatók kezelése**: Az oktatók adatai (név, telefonszám, fizetés stb.) hozzáadhatók, módosíthatók és törölhetők. Az oktatók esetében fuzzy keresési funkció érhető el, amely gyors és rugalmas keresést biztosít.
- **Autósiskolák kezelése**: Az autósiskolák adatai (név, cím, kapcsolattartó stb.) szintén kezelhetők az alkalmazásban.
- **Ügyfelek kezelése**: Az ügyfelek adatai (név, elérhetőség, oktatóhoz való hozzárendelés stb.) is nyilvántarthatók.
- **Kapcsolódó adatok kezelése**: Az adatbázisban az oktatók, autósiskolák és ügyfelek közötti kapcsolatok is nyomon követhetők. Például egy oktató több ügyfélhez és egy autósiskolához is kapcsolódhat.
- **Reszponzív felület**: Az alkalmazás modern, reszponzív felhasználói felületet biztosít.

## Táblák összekapcsolása
Az adatbázisban az entitások (oktatók, autósiskolák, ügyfelek) közötti kapcsolatok relációs logikával vannak megvalósítva:
- Az **oktatók** egy autósiskolához tartoznak.
- Az **ügyfelek** egy oktatóhoz vannak hozzárendelve.
- Az **autósiskolák** több oktatót és ügyfelet is kezelhetnek.

Ez a struktúra lehetővé teszi az adatok hatékony kezelését és a kapcsolatok egyszerű lekérdezését.

## Technológiák
- **Next.js**: A frontend és backend integrációjához.
- **MongoDB**: Az adatok tárolására.
- **Material-UI**: A felhasználói felület komponenseihez.
- **Axios**: API hívások kezelésére.

## Fejlesztés
A fejlesztéshez futtasd a következő parancsot:
```bash
npm install
```
```bash
npm run dev
```
Ezután nyisd meg a [http://localhost:3000](http://localhost:3000) címet a böngésződben.

## Bővíthetőség
Az alkalmazás kódja moduláris felépítésű, és könnyen bővíthető további funkciókkal. Az adatbázis struktúrája lehetővé teszi új entitások és kapcsolatok hozzáadását, például új típusú felhasználók vagy további funkciók implementálását.