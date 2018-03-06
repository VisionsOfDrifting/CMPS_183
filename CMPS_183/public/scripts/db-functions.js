/**** Use this for inserting a fall quarter GPA into the db ****/
function insertFall(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        fall: gpa
    });
}


/**** Use this for inserting overall GPA into the db ****/
function insertTotalGpa(totalGpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/");
    usersRef.update({
        total: totalGpa
    });
}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertSpring(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        spring: gpa
    });
}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertWinter(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        winter: gpa
    });
}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertSummer(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        summer: gpa
    });
}

/**** Use this for inserting a course into the db ****/
function insertCourse(dept, cnum, cname, grade, year, quarter){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses/" + dept + cnum);
    usersRef.update({
        year: year,
        quarter: quarter,
        dept: dept,
        cnum: cnum,
        name: cname,
        grade: grade
    });
}