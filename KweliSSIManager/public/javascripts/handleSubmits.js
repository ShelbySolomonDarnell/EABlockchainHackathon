function fillWalletList() {
  axios.get('/api/wallet/GetUserWalletList',{})
  .then(function(response){
    console.log(response.data);
    let walletList = response.data.wallets
    if ( walletList.length > 0 ) {
      //console.log(walletList[0])
      let selectBox = document.getElementsByName('#list_normalWallets');
      for( let i = 0 ; i < walletList.length ; i++ ) {
        console.log(walletList[i])
        let val = walletList[i].config.id
        $("select[name='list_normalWallets']").append('<option value="' + i + '">' + val + '</option>');
      }
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

/**
 * Generic method to load form values on the page. 
 * @param {*} fName 
 * @param {*} theData 
 */
function loadFormValues(fName, theData){
  let settings = theData[0].configsettings;
  for (let value in settings) {
    if ( document.getElementById(value) != null ) {
      if (settings[value] == true || settings[value] == false) { 
        document.getElementById(value).checked = settings[value]; 
      } 
      else { 
        document.getElementById(value).value = settings[value]; 
      }
    }
    console.log( value + ' ==> ' + settings[value] );
  }
  //console.log( fName + ' config settings ' + printObject(theData[0].configsettings) );
}

function loadPoolList(theData) {
  let theList = theData[0];
  let res = '';
  for (let value in theList) {
    res += theList[value];
    res += '\n';
    alert(theList[value]);
  }
  return res
}

/**
 * 
 * @param {*} theData 
 */
function loadEnrollmentFormValues(theData) {
  loadFormValues('[loadEnrollmentFormValues]', theData);
}

/**
 * 
 * @param {*} theData 
 */
function loadBiometricFormValues(theData) {
  loadFormValues('[loadBiometricFormValues]', theData);
}

/**
 * 
 * @param {*} data 
 */
function printObject (data) {
  let result = '';
  let ndx = 0;
  for ( let value in data ) {
    if ( ndx > 0 ) { result += ', '; }
    result += value;
    ndx += 1;
  }
  return result;
}

// Call API endpoints to get data from the backend configurator service
$(function() {
  $('#btn_initPool').click(function(e){
    e.preventDefault();
    let poolPass = document.getElementById("yPoolPass");
    axios.post('/api/pool/CreateInitial',{
      pass: poolPass.value
    })
    .then(function(response){
      console.log(response.data);
      if ( response.data['message'] != 'You have no authority here'  ) {
        document.getElementById('thePoolPass').style.visibility = 'hidden';
        document.getElementById('divBtnInitPool').style.visibility = 'hidden';
        alert(response.data['message']);
      } else {
        alert(response.data['message']);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  });
});
$(function() {
  $('#btn_walletExists').click(function(e){
    e.preventDefault();
    let wName = document.getElementById("normalWalletName");
    let wCreds = document.getElementById("normalWalletCredentials");
    axios.post('/api/wallet/Exists',{
      id: wName.value,
      key: wCreds.value,
    })
    .then(function(response){
      console.log(response.data);
      if ( response.data['value'] == 2 ) {
        alert(response.data['message']);
        document.getElementById('btn_createWallet').style.visibility = 'hidden';
      } else if ( response.data['value'] == 0 ) {
        alert("<" + wName.value + "> can be created");
        document.getElementById('btn_createWallet').style.visibility = 'visible';
      } else {
        alert("<" + wName.value + "> already exists.");
        document.getElementById('btn_createWallet').style.visibility = 'hidden';
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  });
});
$(function() {
  $('#btn_createWallet').click(function(e){
    e.preventDefault();
    let wName = document.getElementById("normalWalletName");
    let wCreds = document.getElementById("normalWalletCredentials");
    console.log( "Wallet name is " + wName.value +
           "\nCredentials are " + wCreds.value );
    axios.post('/api/wallet/Create',{
      id: wName.value,
      key: wCreds.value,
    })
    .then(function(resp){
      console.log(resp);
    })
    .catch(function(err) {
      console.log(err);
    });
  });
});

$(function() {
  $('#btn_loginWalletManager').click(function(e){
    e.preventDefault();
    let wName = document.getElementById("yWalletName");
    let wCreds = document.getElementById("yWalletCredentials");
    console.log( "Wallet name is " + wName.value +
           "\nCredentials are " + wCreds.value );
    axios.post('/api/wallet/Login',{
      id: wName.value,
      key: wCreds.value,
    })
    .then(function(resp){
      console.log('Logging login check');
      console.log(resp.data);
      alert(JSON.stringify(resp.data));
      $('#walletManagerLoginForm').modal('hide');
			document.getElementById('div_manageWalletNameCreds').style.visibility = 'visible';
      document.getElementById('div_manageWalletExecution').style.visibility = 'visible';
      //$('#btn_loginWalletManager').modal('hide');
      // here you make manager wallets data visible
      fillWalletList()
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      console.log('Finished processing the button actions for manager login');
    })
  });
});


$(function() {
  $('#btn_listPool').click(function(e){
    e.preventDefault();
    axios.get('/api/pool/List',{})
    .then(function(resp){
      console.log('Logging list pool response');
      console.log(resp.data);
      loadPoolList(resp.data);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      console.log('Finished processing the button actions for listing the Pool Ledgers');
    })
  });
});

$(function() {
  $('#biometricsSubmit').click(function(e){
    e.preventDefault();
    let abisServerAddy = document.getElementById("abisserveraddress");
    let abisServerPort = document.getElementById("abisserverport");
    let idMatchScore   = document.getElementById("idmatchscore");
    let veriMatchScore = document.getElementById("verifymatchscore");
    let matchThreshold = document.getElementById("matchthreshold");
    let fingerMaxRot   = document.getElementById("fpmaxrot");
    let fingerQThresh  = document.getElementById("fingersqualitythreshold");
    let fingerMinCount = document.getElementById("fingersminimalminutiacount");
    let irisMaxRot     = document.getElementById("irisesmaximalrotation");
    let irisQThresh    = document.getElementById("irisesqualitythreshold");
    let faceQThresh    = document.getElementById("facequalitythreshold");
    console.log('Submit Biometric configuration form clicked!');
    console.log(
      'ABIS Server Address: '          + abisServerAddy.value
      + '\n' +
      'ABIS Server Port: '             + abisServerPort.value
      + '\n' +
      'ID Match score: '               + idMatchScore.value
      + '\n' +
      'Verification match score: '     + veriMatchScore.value
      + '\n' +
      'Match threshold: '              + matchThreshold.value
      + '\n' +
      'Finger maximal rotation: '      + fingerMaxRot.value
      + '\n' +
      'Finger quality threshold: '     + fingerQThresh.value
      + '\n' +
      'Finger Minimal Minutia Count: ' + fingerMinCount.value
      + '\n' +
      'Iris maximal rotation: '        + irisMaxRot.value
      + '\n' +
      'Iris quality threshold: '       + irisQThresh.value
      + '\n' +
      'Face quality threshold: '       + faceQThresh.value
    );
    $('#biometricsConfigForm').modal('hide');
    axios.put('/api/config/BiometricService',{
      abisserveraddress:          abisServerAddy.value,
      abisserverport:             abisServerPort.value,
      matchthreshold:             matchThreshold.value,
      idmatchscore:               idMatchScore.value,
      verificationmatchscore:     veriMatchScore.value,
    })
    .then(function(resp){
      console.log(resp);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {alert('Data set');});
  });
});   

/**
 * This function is to manage enrollment submission.
 * We use the PUT endpoint because the database is already
 * populated with some values.
 */
// Enrollment submission
$(function() {
  $('#enrollmentSubmit').click(function(e){
    e.preventDefault();
    let bioServiceAddy = document.getElementById("biometricserviceaddress");
    let bioServicePort = document.getElementById("biometricserviceport");
    let endpointHome   = document.getElementById("endpointhome");
    let authPath       = document.getElementById("authpath");
    let enrollPath     = document.getElementById("enrollpath");
    let verifyPath     = document.getElementById("verifypath");
    let idPath         = document.getElementById("idpath");
    let updatePath     = document.getElementById("updatepath");
    let leftIris    = document.getElementById("leftiris");
    let rightIris   = document.getElementById("rightiris");
    let faceFront   = document.getElementById("frontface");
    let face45Left  = document.getElementById("face45left");
    let face45Right = document.getElementById("face45right");
    let llfp = document.getElementById("leftlittlefp");
    let rlfp = document.getElementById("rightlittlefp");
    let lrfp = document.getElementById("leftringfp");
    let rrfp = document.getElementById("rightringfp");
    let lmfp = document.getElementById("leftmiddlefp");
    let rmfp = document.getElementById("rightmiddlefp");
    let lifp = document.getElementById("leftindexfp");
    let rifp = document.getElementById("rightindexfp");
    let ltfp = document.getElementById("leftthumbfp");
    let rtfp = document.getElementById("rightthumbfp");
    console.log('Submit on Enrollment configuration form clicked!');
    console.log('Is left iris checked? ' + leftIris.checked);
    console.log('Is right iris checked? ' + rightIris.checked);
    console.log(
      'Log front face? ' + faceFront.checked 
      + '\n' +
      'Log 45 degree left face: ' + face45Left.checked
      + '\n' +
      'Log 45 degree right face: ' + face45Right.checked
      + '\n' +
      'Log left little fingerprint: ' + llfp.checked
      + '\n' +
      'Log left ring fingerprint: ' + lrfp.checked
      + '\n' +
      'Log left middle fingerprint: ' + lmfp.checked
      + '\n' +
      'Log left index fingerprint: ' + lifp.checked
      + '\n' +
      'Log left thumb fingerprint: ' + ltfp.checked
      + '\n' +
      'Log right little fingerprint: ' + rlfp.checked
      + '\n' +
      'Log right ring fingerprint: ' + rrfp.checked
      + '\n' +
      'Log right middle fingerprint: ' + rmfp.checked
      + '\n' +
      'Log right index fingerprint: ' + rifp.checked
      + '\n' +
      'Log right thumb fingerprint: ' + rtfp.checked
    );
    $('#enrollmentConfigForm').modal('hide');
    axios.put('/api/config/EnrollmentService',{
      biometricserviceaddress: bioServiceAddy.value,
      biometricserviceport: bioServicePort.value,
      endpointhome: endpointHome.value,
      authpath: authPath.value,
      enrollpath: enrollPath.value,
      verifypath: verifyPath.value,
      idpath: idPath.value,
      updatepath: updatePath.value,
      rightthumbfp: rtfp.checked,
      rightindexfp: rifp.checked,
      rightmiddlefp: rmfp.checked,
      rightringfp: rrfp.checked,
      rightlittlefp: rlfp.checked,
      leftthumbfp: ltfp.checked,
      leftindexfp: lifp.checked,
      leftmiddlefp: lmfp.checked,
      leftringfp: lrfp.checked,
      leftlittlefp: llfp.checked,
      frontface: faceFront.checked,
      face45right: face45Right.checked,
      face45left: face45Left.checked,
      rightiris: rightIris.checked,
      leftiris: leftIris.checked
    })
    .then(function(resp){
      console.log(resp);
      //alert( 'Post Enrollment form data: ' + JSON.stringify(resp) );
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {alert('Data set');});
  });
});