function checkform(of)
		{
		// Teste si DOM est disponible et s'il y a un Ã©lÃ©ment appelÃ© "required"
			if(!document.getElementById || !document.createTextNode){return;}
			if(!document.getElementById('required')){return;}

		// DÃ©finit les messages d'erreur et sÃ©pare les champs requis
			var errorID='errormsg';
			var errorClass='error';
			/* changements pour la liste des noms */
			var errorMsg=alert('Merci d\'entrer ou de modifier le contenu des champs suivants:');
			/* fin des changements pour la liste des noms */
			var errorImg='img/alert.png';
			var errorAlt='Erreur';
			var errorTitle='Ce champ est erronÃ© !';
			var reqfields=document.getElementById('required').value.split(',');

		// Nettoyage des anciens messages
			// s'il y a un ancien champ errormessage, on le supprime
			if(document.getElementById(errorID))
			{
				var em=document.getElementById(errorID);
				em.parentNode.removeChild(em);
			}
			// supprime les anciennes images et classes des champs requis
			for(var i=0;i<reqfields.length;i++)
			{
				var f=document.getElementById(reqfields[i]);
				if(!f){continue;}
				if(f.previousSibling && /img/i.test(f.previousSibling.nodeName))
				{
					f.parentNode.removeChild(f.previousSibling);
				}
				f.className='';
			}
		// boucle sur les champs requis
			for(var i=0;i<reqfields.length;i++)
			{
		// vÃ©rifie que le champs requis est prÃ©sent
				var f=document.getElementById(reqfields[i]);
				if(!f){continue;}
		// teste si le champ requis est erronÃ©,
		// en fonction de son type 
				switch(f.type.toLowerCase())
				{
					case 'text':
						if(f.value=='' && f.id!='email'){cf_adderr(f)}							
		// email est un champ spÃ©cial nÃ©cessitant une vÃ©rification
						if(f.id=='email' && !cf_isEmailAddr(f.value)){cf_adderr(f)}							
					break;
					case 'textarea':
						if(f.value==''){cf_adderr(f)}							
					break;
					case 'radio':
						if(!f.checked){cf_adderr(f)}							
					break;
					case 'radio':
						if(!f.selectedIndex && f.selectedIndex==0){cf_adderr(f)}							
					break;
				}
			}
			return !document.getElementById(errorID);

			/* MÃ©thodes outils */
			function cf_adderr(o)
			{
				// crÃ©e l'image, l'ajoute et colorie les champs erronÃ©s
				var errorIndicator=document.createElement('img');
				errorIndicator.alt=errorAlt;
				errorIndicator.src=errorImg;
				errorIndicator.title=errorTitle;
				o.className=errorClass;
				o.parentNode.insertBefore(errorIndicator,o);

			// VÃ©rifie qu'il n'y a pas de message d'erreur
				if(!document.getElementById(errorID))
				{
				// crÃ©e "errormessage" et l'insÃ¨re avant le bouton d'envoi
					var em=document.createElement('div');
					em.id=errorID;
					var newp=document.createElement('p');
					newp.appendChild(document.createTextNode(errorMsg))
					// duplique et insÃ¨re le message d'erreur
					newp.appendChild(errorIndicator.cloneNode(true));
					em.appendChild(newp);
					/* ajout pour la liste des noms */
					var newul=document.createElement('ul');		
					em.appendChild(newul);
					/* fin d'ajout pour la liste des noms */
					// trouve le bouton d'envoi
					for(var i=0;i<of.getElementsByTagName('input').length;i++)
					{
						if(/submit/i.test(of.getElementsByTagName('input')[i].type))
						{
							var sb=of.getElementsByTagName('input')[i];
							break;
						}
					}
					if(sb)
					{
						sb.parentNode.insertBefore(em,sb);
					}	
				} 
				/* ajout pour la liste des noms */
				var em=document.getElementById(errorID).getElementsByTagName('ul')[0];
				var newli=document.createElement('li');
				for(var i=0;i<of.getElementsByTagName('label').length;i++)
				{
					if(of.getElementsByTagName('label')[i].htmlFor==o.id)
					{
						var txt=of.getElementsByTagName('label')[i].firstChild.nodeValue;
						break;
					}
				}
				newli.appendChild(document.createTextNode(txt));
				em.appendChild(newli);
				/* fin d'ajout pour la liste des noms */
			}
			function cf_isEmailAddr(str) 
			{
			    return str.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
			}
		}