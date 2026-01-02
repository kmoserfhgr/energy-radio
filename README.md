
Projektbeschreibung
Unsere Website visualisiert die drei meistgespielten Songs und Artists von Energy Radio für drei Zeiträume: Tag, Woche und Monat.
Alle drei Stunden greifen wir automatisiert auf die API von Energy Radio zu und speichern in unserer Datenbank, welcher Song zu welchem Zeitpunkt gespielt wurde. Auf Basis dieser Daten wird berechnet, wie oft jeder Song innerhalb der jeweiligen Zeiträume abgespielt wurde. Die drei meistgespielten Songs werden anschliessend auf einem Podest dargestellt, wobei ausschliesslich der erstplatzierte Song als Audio abgespielt wird, sobald eine User-Aktion stattgefunden hat.

Schwierigkeiten & Learnings
Da wir während des Unterrichts gut vorangekommen sind und bei Fragen oder Problemen direkt unsere Dozentin Lea um Unterstützung bitten konnten, traten insgesamt nur wenige grössere Schwierigkeiten auf. Grundsätzlich stellte das Erlernen und Anwenden von JavaScript eine grössere Herausforderung dar. Das Verständnis der technischen Anforderungen, das Zusammenspiel von Frontend, Backend, Datenbank und API sowie das strukturierte „Aufdröseln“ des gesamten Projekts waren innerhalb von knapp fünf Unterrichtstagen sehr anspruchsvoll. Wir hatten Glück mit Lea, da sie den Stoff verständlich herunterbrechen konnte und uns während des Projekts sehr gut unterstützt hat. Dennoch fühlen wir uns in diesem Bereich noch nicht vollständig sattelfest, da wir schon stark auf Unterstützung durch Lea, ChatGPT sowie weitere Online-Ressourcen angewiesen waren. Um diese Inhalte sicherer zu beherrschen, müssten wir deutlich mehr Zeit für Übungen aufwenden können.

Profitieren konnten wir sicher auch schon zu Beginn mit der Erstellung des UX-Designs im Figma. Da konnten wir auch einige neue Wege entdecken, wie wir eine Seite Userfriendly darstellen und animieren können. Eine der zentralen Herausforderungen beim Programmieren bestand für uns darin, die Datenbankabfragen so zu programmieren, dass korrekt berechnet wird, wie oft ein Song innerhalb eines bestimmten Zeitraums abgespielt wurde, und daraus zuverlässig nur die drei meistgespielten Songs ermittelt werden.

Ein weiteres Learning betraf die Zusammenarbeit mit ChatGPT. Oft liefert ChatGPT sehr lange und komplexe Code-Lösungen, die für Einsteiger schwer nachvollziehbar sind. Ein wichtiger Erkenntnisgewinn war deshalb, die Prompts gezielt zu präzisieren, beispielsweise mit der Aufforderung, den Code möglichst einfach, kurz und verständlich zu halten und schwierigere Teile zusätzlich zu erklären.

Zudem gab es kleinere technische Details, die nicht vollständig wie gewünscht funktionierten und bei denen wir trotz Recherche keine abschliessende Lösung finden konnten. Diese Punkte zeigten uns deutlich, wo noch Wissenslücken bestehen.

Benutzte Ressourcen
Ressourcen: 
- API: Energy Radio Stations
- HTML
- CSS
- PHP
- SQL
- JavaScript
- Lea

Als unterstützende Ressource nutzten wir ChatGPT und Perplexitii hauptsächlich zur Ergänzung, Vereinfachung und Kürzung von bestehendem Code. Dabei arbeiteten wir mit sehr konkreten und detaillierten Prompts. Ein Beispiel dafür ist folgender Prompt:

„Du bist Website-Programmierer, spezialisiert auf CSS. Du bekommst ein fertiges HTML- und JavaScript-Skript sowie einen angefangenen CSS-Code. Folgende Änderungen am CSS-Code sollen umgesetzt werden:
– Stern (star) und Anzahl Abspielungen (plays) sollen im roten Balken (podium-body) zentriert sein
– Die Website soll nicht scrollbar sein, sondern Podium und Header sollen sich immer an die Grösse des Geräts anpassen
– Die roten Flächen (podium-body) sollen einen dünnen schwarzen Rand haben
– Die podium-body-Flächen sollen ohne Abstand direkt am unteren Bildschirmrand anschliessen

Zur Hilfe: Anbei das Laptop- und Smartphone-Design gemäss Kundenvorgabe.
Zusätzlich: Lösche alle CSS-Zeilen, die keine Wirkung haben oder doppelt vorhanden sind, und gib am Ende den vollständigen, bereinigten CSS-Code aus.
Bevor du beginnst, stelle mir drei Fragen, um die Aufgabe besser zu verstehen.“