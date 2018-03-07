/**** Use this for inserting overall GPA into the db ****/
function insertTotalGpa(totalGpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/");
    usersRef.update({
        total: totalGpa
    });
}

/**** Use this for inserting a quarter GPA into the db ****/
function insertSeason(year, gpa, season){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        [season]: gpa
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