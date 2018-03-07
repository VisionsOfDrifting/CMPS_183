/*********** Parse Function *****************/
if (document.getElementById('submissionButton')) {
    document.getElementById('submissionButton').onchange = function(){
        var file = this.files[0];

        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e){
            var marker = 0;
            var startRead = 0;
            var startSemester = 0;

            var semester = "";
            var subject = "";
            var number = "";
            var name = "";
            var grade = "";

            var count = 0;
            var toCount = 0;
			var gpaCount = 0;
			var cumGPAcount = 0;
			var qGPA = 0;
			var gpaBool = 0
			var cumGPAbool = 0;
            var quarter = "";

            var stopCondition = 0;

            var beginUndergrad = 0;

            var lines = this.result.split('\n');
            for(var line = 0; line < lines.length; line++){
                var toCount = 0;
                var inputLine = lines[line].toString();
				
				if(inputLine.indexOf("Term GPA") > 0){
					gpaCount = 3;
					if(gpaBool == 0){
						gpaBool = 1;
					} else {
						gpaBool = 0;
					}
				}
				
				if(inputLine.indexOf("Cum GPA") > 0){
					cumGPAcount = 3;
				}
				
				if(cumGPAcount == 1 && cumGPAbool == 0){
					var totalGPA = inputLine.substring(inputLine.indexOf('</span>') - 4, inputLine.indexOf('</span>'));
					cumGPAbool = 1;
                    insertTotalGpa(totalGPA);
				}
				
				if(gpaCount == 1 && startRead == 1 && gpaBool == 1){
					qGPA = inputLine.substring(inputLine.indexOf('</span>') - 4, inputLine.indexOf('</span>'));
                    //insertSeason(year, qGPA, semester);
					if (semester.includes("Fall")) {
                        insertSeason(year, qGPA, "fall");
                    } else if (semester.includes("Winter")) {
                        insertSeason(year, qGPA, "winter");
                    } else if (semester.includes("Spring")) {
                        insertSeason(year, qGPA, "spring");
                    } else if (semester.includes("Summer")) {
                        insertSeason(year, qGPA, "summer");
                    }
				}
				
                if (inputLine.indexOf("Quarter") > 0) {
                    count = 0;
                    semester = inputLine.substring(65);
                    semester = semester.substring(0, semester.indexOf('<'));
                    console.log(semester);
                    var year = semester.substr(0,4);
                    var courseCount = 0;
                    var creditCount = 0;
                    startRead = 1;
                    stopCondition = 0;
                    fRun = false;
                    if (semester.includes("Fall")) {
                        quarter = "Fall";
                    } else if (semester.includes("Winter")) {
                        quarter = "Winter";
                    } else if (semester.includes("Spring")) {
                        quarter = "Spring";
                    } else if (semester.includes("Summer")) {
                        quarter = "Summer";
                    }
                }
                if(inputLine.indexOf('Academic Standing Effective') > -1){
                    startSemester = 0;
                }
                if(inputLine.indexOf('<tr class="c28">') == 0 || inputLine.indexOf('<tr class="c26">') == 0){
                    marker = 1;
                }
                if(inputLine.indexOf('</tr>') == 0 && startSemester == 1) {
                    marker = 0;
                }
                if(inputLine.indexOf('Term Honor:') > 1){
                    startSemester = 0;
                }
                if(inputLine.indexOf('Term GPA') > 1){
                    startSemester = 0;
                }
                if(marker == 1 && startRead == 1 && startSemester == 1 && stopCondition == 0){
                    if(inputLine.indexOf("Repeated:") > -1){
                        count--;
                        toCount = 1;
                    } else if(inputLine.indexOf("Repeated") > -1 || inputLine.indexOf("Repeat of") > -1){
                        count--;
                        count--;
                        toCount = 1;
                    }
                    if(count == 2){
                        subject = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                        subject = subject.substring(0, subject.indexOf('<'));
                        console.log(subject);

                        if(inputLine.indexOf("Term GPA") > -1){
                            stopCondition = 1;
                        }
                    }
                    if(count == 4){
                        number = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                        number = number.substring(0, number.indexOf('<'));
                        console.log(number);
                    }
                    if(count == 6){
                        name = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                        name = name.substring(0, name.indexOf('<'));
                        console.log(name);
                    }
                    if(count == 12){
                        grade = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                        grade = grade.substring(0, grade.indexOf('<'));

                        if (grade.includes("c5")) {
                            grade = "IP";
                            startRead = 0; // stops the read but still need to get last entry(s)
                        }

                        console.log(grade);
                        console.log(" ");

                        if (!grade.includes("W") && !grade.includes("IP")){
                            courseCount += 1;
                        }

                        if(grade.indexOf('"top"') > -1){
                            startRead = 0;
                        } else if(number != ""){
							insertCourse(subject, number, name, grade, year, quarter);
						}
                    }
                    if(count == 14){
                        count = -1;
                    }
                    if(toCount == 0){
                        count++;
                    }
                }
                if(inputLine.indexOf("Beginning of") > -1){
                    beginUndergrad = 1;
                }
                if(inputLine.indexOf("Points") > 0 && beginUndergrad == 1){
                    startSemester = 1;
                }
				gpaCount--;
				cumGPAcount--;
            }
        };
    };
}