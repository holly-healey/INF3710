--Q1
SELECT specialite FROM medecins WHERE idmedecin = 3;

--Q2 
SELECT nom, prenom FROM medecins WHERE anneesexperience > 10;

--Q3
SELECT COUNT(*) FROM patientexamens;

--Q4
SELECT nomexamen, cout, MAX(dateexamen) FROM examens NATURAL JOIN patientexamens GROUP BY nomexamen, cout ORDER BY cout DESC LIMIT 1

--Q5   
SELECT prenom, nom, age(CURRENT_DATE,datedenaissance) FROM patients ORDER BY nom DESC;

--Q6
SELECT AVG(cout) FROM examens ;

--Q7
SELECT M.prenom, M.nom, COUNT(RDV.idrendezvous) AS "Nombre de rendez-vous"
FROM medecins M, rendezvous RDV
WHERE M.idmedecin = RDV.idmedecin
AND RDV.daterendezvous >= '2023-09-21'
GROUP BY M.idmedecin ;

--Q8 OK d'avoir mis des dates fixes ?
SELECT prenom, nom, numerodetelephone FROM patients NATURAL JOIN rendezvous 
WHERE daterendezvous >= '2023-11-13' AND daterendezvous <= '2023-11-19' ;

--Q9
SELECT nom, prenom, SUM(cout) 
FROM patients NATURAL JOIN patientexamens NATURAL JOIN examens NATURAL JOIN services 
WHERE idpatient = 4 AND nomservice LIKE 'C%'
GROUP BY nom, prenom ;

--Q10
SELECT P.nom, P.prenom FROM patients P, rendezvous RDV, medecins M
WHERE P.idpatient = RDV.idpatient AND M.idmedecin = RDV.idmedecin
AND M.anneesexperience = (SELECT MAX(anneesexperience) FROM medecins) ;

--Q11
SELECT P.nom, P.prenom FROM patients P, patientexamens PE, examens E
WHERE P.idpatient = PE.idpatient AND E.idexamen = PE.idexamen
AND E.cout > 200 
GROUP BY P.idpatient
HAVING SUM(cout) > 2000 ;

--Q12
SELECT M.prenom, M.nom FROM medecins M, rendezvous RDV
WHERE M.idmedecin = RDV.idmedecin
AND RDV.daterendezvous <= CURRENT_DATE AND RDV.daterendezvous >= CURRENT_DATE - INTERVAL '6 month'
GROUP BY M.idmedecin
HAVING COUNT(idpatient) = 
	(SELECT COUNT(idpatient) FROM rendezvous
	WHERE daterendezvous <= CURRENT_DATE AND daterendezvous >= CURRENT_DATE - INTERVAL '6 month'
	GROUP BY idmedecin ORDER BY COUNT(idpatient) DESC LIMIT 1) ;

--Q13
SELECT prenom, nom FROM medecins
WHERE idmedecin NOT IN (SELECT idmedecin FROM rendezvous) ;


--Q14
SELECT P.prenom, P.nom FROM patients P, patientexamens PE
WHERE P.idpatient = PE.idpatient
AND PE.resultat <> 'Résultats normaux'
GROUP BY P.idpatient
HAVING COUNT(dateexamen) = 
	(SELECT COUNT(dateexamen) FROM patientexamens WHERE resultat <> 'Résultats normaux'
	GROUP BY idpatient ORDER BY count(dateexamen) DESC LIMIT 1);


--Q15 
SELECT prenom, nom FROM patients NATURAL JOIN patientexamens PE NATURAL JOIN examens E
GROUP BY idpatient
HAVING COUNT(DISTINCT idservice) = (SELECT COUNT(DISTINCT idservice) FROM services);

--Q16
CREATE VIEW V_TotalExamens
(V_nom, V_prenom, V_tot) AS 
SELECT P.nom , P.prenom, SUM(E.cout)
FROM patients P, patientexamens PE, examens E
WHERE P.idpatient = PE.idpatient AND PE.idexamen = E.idexamen
AND P.adresse LIKE '%e__' OR P.adresse LIKE '%o__'
GROUP BY P.idpatient
HAVING SUM(E.cout) >= 500 
ORDER BY P.nom ASC, SUM(E.cout) DESC

DROP VIEW V_TotalExamens

SELECT * from services
GROUP BY idpatient
SELECT * FROM patients