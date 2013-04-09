'use strict';

/* jasmine specs for controllers go here */

describe('Course List Ctrl', function () {
//  var courseListCtrl;
//
//  beforeEach(function(){
//      courseListCtrl = new CourseListCtrl();
//  });
    describe('CourseListCtrl', function () {
        var scope, ctrl, $httpBackend;
        beforeEach(module('dteCourseAdminServices'));

        beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/DTEAdmin/services/Title').
                respond({"courseTitle":[
                    {"description": "Title Description 1", "id": "1", "name": "#Title Name 1"}
                    ,
                    {"description": "Title Description 2", "id": "2", "name": "#Title Name 2"}
                ]});

            $httpBackend.expectGET('/DTEAdmin/services/Language').
                respond({"courseLanguage":[
                    {"description": "English", "id": "1", "lang": "English", "updateUser": "DTE_COURSE_ADMIN"}
                    ,
                    {"description": "Spanish", "id": "2", "lang": "Spanish", "updateUser": "DTE_COURSE_ADMIN"}
                    ,
                    {"description": "Korean", "id": "3", "lang": "Korean", "updateUser": "DTE_COURSE_ADMIN"}
                ]});

            $httpBackend.expectGET('/DTEAdmin/services/StateCode').
                respond({"stateCode":[
                    {"description": "Alabama", "id": "1", "stateCd": "AL", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Alaska", "id": "2", "stateCd": "AK", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Arizona", "id": "3", "stateCd": "AZ", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Arkansas", "id": "4", "stateCd": "AR", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "California", "id": "5", "stateCd": "CA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Colorado", "id": "6", "stateCd": "CO", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Connecticut", "id": "7", "stateCd": "CT", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Deleware", "id": "8", "stateCd": "DE", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "District of Columbia", "id": "9", "stateCd": "DC", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Florida", "id": "10", "stateCd": "FL", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Georgia", "id": "11", "stateCd": "GA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Hawaii", "id": "12", "stateCd": "HI", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Idaho", "id": "13", "stateCd": "ID", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Illinois", "id": "14", "stateCd": "IL", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Indiana", "id": "15", "stateCd": "IN", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Iowa", "id": "16", "stateCd": "IA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Kansas", "id": "17", "stateCd": "KS", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Kentucky", "id": "18", "stateCd": "KY", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Louisiana", "id": "19", "stateCd": "LA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Maine", "id": "20", "stateCd": "ME", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Maryland", "id": "21", "stateCd": "MD", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Massachusetts", "id": "22", "stateCd": "MA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Michigan", "id": "23", "stateCd": "MI", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Minnesota", "id": "24", "stateCd": "MN", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Mississippi", "id": "25", "stateCd": "MS", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Missouri", "id": "26", "stateCd": "MO", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Montana", "id": "27", "stateCd": "MT", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Nebraska", "id": "28", "stateCd": "NE", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Nevada", "id": "29", "stateCd": "NV", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "New Hampshire", "id": "30", "stateCd": "NH", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "New Jersey", "id": "31", "stateCd": "NJ", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "New Mexico", "id": "32", "stateCd": "NM", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "New York", "id": "33", "stateCd": "NY", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "North Carolina", "id": "34", "stateCd": "NC", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "North Dakota", "id": "35", "stateCd": "ND", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Ohio", "id": "36", "stateCd": "OH", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Oklahoma", "id": "37", "stateCd": "OK", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Oregon", "id": "38", "stateCd": "OR", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Pennsylvania", "id": "39", "stateCd": "PA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Rhode Island", "id": "40", "stateCd": "RI", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "South Carolina", "id": "41", "stateCd": "SC", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "South Dakota", "id": "42", "stateCd": "SD", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Tennessee", "id": "43", "stateCd": "TN", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Texas", "id": "44", "stateCd": "TX", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Utah", "id": "45", "stateCd": "UT", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Vermont", "id": "46", "stateCd": "VT", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Virginia", "id": "47", "stateCd": "VA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Washington", "id": "48", "stateCd": "WA", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "West Virginia", "id": "49", "stateCd": "WV", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Wisconsin", "id": "50", "stateCd": "WI", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Wyoming", "id": "51", "stateCd": "WY", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "American Samoa", "id": "52", "stateCd": "AS", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Guam", "id": "53", "stateCd": "GU", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "Puerto Rico", "id": "54", "stateCd": "PR", "updateUser": "DTE_COURSE_ADMIN"},
                    {"description": "US Virgin Islands", "id": "55", "stateCd": "VI", "updateUser": "DTE_COURSE_ADMIN"}
                ]});

            $httpBackend.expectGET('/DTEAdmin/services/EducationCenter').
                respond({"educationCenter":[
                    {"city": "Tuscaloosa", "description": "initial insert", "id": "1", "name": "University of Alabama, The", "stateCodes": {"description": "Alabama", "id": "1", "stateCd": "AL", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://alabamasafestate.ua.edu/education-training/OTI-education-center/"},
                    {"city": "Carson", "description": "initial insert", "id": "2", "name": "California State University Dominguez Hills", "stateCodes": {"description": "California", "id": "5", "stateCd": "CA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.csudh.edu/OSHA"},
                    {"city": "Dublin", "description": "initial insert", "id": "3", "name": "Chabot-Las Positas Community College District OSHA Training Center", "stateCodes": {"description": "California", "id": "5", "stateCd": "CA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.osha4you.com"},
                    {"city": "Lakewood", "description": "initial insert", "id": "5", "name": "Rocky Mountain Education Center - Red Rocks Community College", "stateCodes": {"description": "Colorado", "id": "6", "stateCd": "CO", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.rmecosha.com/"},
                    {"city": "Wesley Chapel", "description": "initial insert", "id": "6", "name": "University of South Florida", "stateCodes": {"description": "Florida", "id": "10", "stateCd": "FL", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.cme.hsc.usf.edu/coph/oti/index.html"},
                    {"city": "Atlanta", "description": "initial insert", "id": "7", "name": "Georgia Tech Research Institute", "stateCodes": {"description": "Georgia", "id": "11", "stateCd": "GA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.pe.gatech.edu/safety-health"},
                    {"city": "Cedar Rapids", "description": "initial insert", "id": "8", "name": "Midwest OTI Education Center - Kirkwood Community College", "stateCodes": {"description": "Iowa", "id": "16", "stateCd": "IA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.kirkwood.edu/site/index.php?d=1089"},
                    {"city": "Hillside", "description": "initial insert", "id": "9", "name": "National Safety OTI Education Center - Construction Safety Council", "stateCodes": {"description": "Illinois", "id": "14", "stateCd": "IL", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.nsec.niu.edu/nsec/"},
                    {"city": "Itasca", "description": "initial insert", "id": "10", "name": "National Safety OTI Education Center - National Safety Council", "stateCodes": {"description": "Illinois", "id": "14", "stateCd": "IL", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.safenebraska.org/safe-working/oti-moec.php"},
                    {"city": "DeKalb", "description": "initial insert", "id": "11", "name": "National Safety OTI Education Center - Northern Illinois University", "stateCodes": {"description": "Illinois", "id": "14", "stateCd": "IL", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.nsec.niu.edu/nsec/"},
                    {"city": "Richmond", "description": "initial insert", "id": "12", "name": "Eastern Kentucky University", "stateCodes": {"description": "Kentucky", "id": "18", "stateCd": "KY", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.ceo.eku.edu/osha"},
                    {"city": "Baltimore", "description": "initial insert", "id": "14", "name": "Mid-Atlantic OTI Education Center - Chesapeake Region Safety Council", "stateCodes": {"description": "Maryland", "id": "21", "stateCd": "MD", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.chesapeakesc.org"},
                    {"city": "Baltimore", "description": "initial insert", "id": "15", "name": "Mid-Atlantic OTI Education Center - Johns Hopkins University & Health System", "stateCodes": {"description": "Maryland", "id": "21", "stateCd": "MD", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.oshamidatlantic.org/"},
                    {"city": "Silver Spring", "description": "initial insert", "id": "16", "name": "National Resource Center - National Labor College", "stateCodes": {"description": "Maryland", "id": "21", "stateCd": "MD", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.nlc.edu/educational-programs/osha-training"},
                    {"city": "Ypsilanti", "description": "initial insert", "id": "17", "name": "Great Lakes Regional OTI Education Center - Eastern Michigan University", "stateCodes": {"description": "Michigan", "id": "23", "stateCd": "MI", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.emuosha.org/"},
                    {"city": "Detroit", "description": "initial insert", "id": "18", "name": "Great Lakes Regional OTI Education Center - UAW Health and Safety Department", "stateCodes": {"description": "Michigan", "id": "23", "stateCd": "MI", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.greatlakesosha.org/"},
                    {"city": "Kansas City", "description": "initial insert", "id": "19", "name": "Metropolitan Community Colleges", "stateCodes": {"description": "Missouri", "id": "26", "stateCd": "MO", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.mcckc.edu/osha"},
                    {"city": "St. Louis", "description": "initial insert", "id": "20", "name": "Midwest OTI Education Center - Saint Louis University", "stateCodes": {"description": "Missouri", "id": "26", "stateCd": "MO", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.safenebraska.org/safe-working/oti-moec.php"},
                    {"city": "Raleigh", "description": "initial insert", "id": "21", "name": "Southeastern OTI Education Center - North Carolina State University", "stateCodes": {"description": "North Carolina", "id": "34", "stateCd": "NC", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.ies.ncsu.edu/otieducationcenter/"},
                    {"city": "Omaha", "description": "initial insert", "id": "22", "name": "Midwest OTI Education Center - National Safety Council", "stateCodes": {"description": "Nebraska", "id": "28", "stateCd": "NE", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.safenebraska.org/safe-working/oti-moec.php"},
                    {"city": "Manchester", "description": "initial insert", "id": "23", "name": "Keene State College", "stateCodes": {"description": "New Hampshire", "id": "30", "stateCd": "NH", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://oshaedcenter.com/"},
                    {"city": "Piscataway", "description": "test insert", "id": "25", "name": "Atlantic OSHA Education Center - University of Medicine and Dentistry of New Jersey", "stateCodes": {"description": "New Jersey", "id": "31", "stateCd": "NJ", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://ophp.umdnj.edu/"},
                    {"city": "Las Vegas", "description": "test insert", "id": "26", "name": "College of Southern Nevada", "stateCodes": {"description": "Nevada", "id": "29", "stateCd": "NV", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://sites.csn.edu/workforce/osha.asp"},
                    {"city": "Rochester", "description": "test insert", "id": "27", "name": "Rochester Institute of Technology", "stateCodes": {"description": "New York", "id": "33", "stateCd": "NY", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=https://www.rit.edu/academicaffairs/outreach/OSHA/"},
                    {"city": "Buffalo", "description": "test insert", "id": "28", "name": "Atlantic OSHA Education Center - University at Buffalo", "stateCodes": {"description": "New York", "id": "33", "stateCd": "NY", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.smbs.buffalo.edu/CENTERS/trc/"},
                    {"city": "Springboro", "description": "test insert", "id": "29", "name": "Mid-America OTI Education Center - Ohio Valley Construction Education Foundation", "stateCodes": {"description": "Ohio", "id": "36", "stateCd": "OH", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://midamericaosha.org/"},
                    {"city": "Cincinnati", "description": "test insert", "id": "30", "name": "Great Lakes Regional OTI Education Center - University of Cincinnati", "stateCodes": {"description": "Ohio", "id": "36", "stateCd": "OH", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.greatlakesosha.org"},
                    {"city": "Plymouth Meeting", "description": "test insert", "id": "31", "name": "Mid-Atlantic OTI Education Center - ECRI Institute", "stateCodes": {"description": "Pennsylvania", "id": "39", "stateCd": "PA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.oshamidatlantic.org/"},
                    {"city": "Philadelphia", "description": "test insert", "id": "32", "name": "Mid-Atlantic OTI Education Center - Mid-Atlantic Construction Safety Council", "stateCodes": {"description": "Pennsylvania", "id": "39", "stateCd": "PA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.oshamidatlantic.org/"},
                    {"city": "Bayamon", "description": "test insert", "id": "33", "name": "Atlantic OSHA Education Center - Universidad de Metropolotania", "stateCodes": {"description": "Puerto Rico", "id": "54", "stateCd": "PR", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.suagm.edu/umet/osha.asp"},
                    {"city": "Nashville", "description": "test insert", "id": "34", "name": "Southeastern OTI Education Center - University of Tennessee", "stateCodes": {"description": "Tennessee", "id": "43", "stateCd": "TN", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=https://cis.tennessee.edu/train/programtraining/Pages/OTI-Center.aspx"},
                    {"city": "Salt Lake City", "description": "test insert", "id": "37", "name": "Mountain West OTI Education Center - Salt Lake Community College", "stateCodes": {"description": "Utah", "id": "45", "stateCd": "UT", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://mountainwestosha.com"},
                    {"city": "Vernal", "description": "test insert", "id": "38", "name": "Mountain West OTI Education Center - Uintah Basin Applied Technology College (UBATC)", "stateCodes": {"description": "Utah", "id": "45", "stateCd": "UT", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://mountainwestosha.com"},
                    {"city": "Salt Lake City", "description": "test insert", "id": "39", "name": "Mountain West OTI Education Center - University of Utah", "stateCodes": {"description": "Utah", "id": "45", "stateCd": "UT", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://mountainwestosha.com"},
                    {"city": "Seattle", "description": "test insert", "id": "40", "name": "University of Washington", "stateCodes": {"description": "Washington", "id": "48", "stateCd": "WA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=https://osha.washington.edu/"},
                    {"city": "Morgantown", "description": "test insert", "id": "41", "name": "National Resource Center - West Virginia University", "stateCodes": {"description": "West Virginia", "id": "49", "stateCd": "WV", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.safetyandhealth.ext.wvu.edu/osha_ed_center"},
                    {"city": "Silver Spring", "description": "initial insert", "id": "13", "name": "National Resource Center - Center to Protect Workers Rights (CPWR)", "stateCodes": {"description": "Maryland", "id": "21", "stateCd": "MD", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.cpwr.com/training-osha.html"},
                    {"city": "Mesquite", "description": "test insert", "id": "35", "name": "Southwest Education Center - Texas A&M Engineering Extension Service(TEEX)", "stateCodes": {"description": "Texas", "id": "44", "stateCd": "TX", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://www.teex.com/prt/"},
                    {"city": "San Diego", "description": "initial insert", "id": "4", "name": "University of California, San Diego", "stateCodes": {"description": "California", "id": "5", "stateCd": "CA", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=http://osha.ucsd.edu/"},
                    {"city": "Arlington", "description": "test insert", "id": "36", "name": "University of Texas at Arlington", "stateCodes": {"description": "Texas", "id": "44", "stateCd": "TX", "updateUser": "DTE_COURSE_ADMIN"}, "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha.gov/pls/oshaweb/owaredirect.html?p_url=https://www.uta.edu/wconnect/osha/static/osha-home.shtml"}
                ]});

            $httpBackend.expectGET(/^\/DTEAdmin\/services\/Course?/).
                respond({"course":[
                    {"activeInd": "1", "address": "13909 Bradshaw Road", "ceuPoints": "0.7", "city": "Sacramento", "cmPoints": "0", "cost": "345", "edCenterId": "3", "endDate": "2012-12-17T00:00:00-07:00", "id": "109", "industryId": "1", "langId": "3", "length": "3", "location": "Sacramento:  Safety Center", "noOfDays": "1", "startDate": "2012-12-18T00:00:00-07:00", "stateId": "5", "titleId": "37", "updateDate": "2013-01-10T16:39:43-07:00", "updateUser": "Carter.Blaine.1947855772", "url": "http://www.oshax4you.com/osha-7405"},
                    {"activeInd": "1", "address": "3909 Bradshaw Road", "ceuPoints": "0.7", "city": "Sacramento", "cmPoints": "0", "cost": "155", "edCenterId": "3", "endDate": "2012-03-14T00:00:00-06:00", "id": "110", "industryId": "1", "langId": "1", "length": "7", "location": "Sacramento:  Safety Center", "noOfDays": "1", "startDate": "2012-03-14T00:00:00-06:00", "stateId": "5", "titleId": "38", "updateDate": "2012-12-04T16:39:15-07:00", "updateUser": "DTE_COURSE_ADMIN", "url": "http://www.osha4you.com/osha-7410"}
                ]});

            scope = $rootScope.$new();
            ctrl = $controller(CourseListCtrl, {$scope: scope});
        }));

        it('should create "messageLabel" variable with a value of Show', function () {
            expect(scope.messageLabel).toEqual("Show");
        });

        it('should create "courseLanguages" variable with 3 entries', function () {
            expect(scope.courseLanguages).toBeUndefined();
            $httpBackend.flush();
            expect(scope.messageLabel).toEqual("Show");
            expect(scope.courseLanguages.length).toBe(3);
        });
    });
});

describe('PhoneCat controllers', function () {

    describe('PhoneListCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([
                    {name: 'Nexus S'},
                    {name: 'Motorola DROID'}
                ]);

            scope = $rootScope.$new();
            ctrl = $controller(PhoneListCtrl, {$scope: scope});
        }));

        it('should create "phones" model with 2 phones fetched from xhr', function () {
            expect(scope.phones).toBeUndefined();
            $httpBackend.flush();

            expect(scope.phones).toEqual([
                {name: 'Nexus S'},
                {name: 'Motorola DROID'}
            ]);
        });

        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });
});

//describe('MyCtrl2', function(){
//  var myCtrl2;
//
//
//  beforeEach(function(){
//    myCtrl2 = new MyCtrl2();
//  });
//
//
//  it('should ....', function() {
//    //spec body
//  });
//});
