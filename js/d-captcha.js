/**
 * @author Dawood Butt
 * @description Simple Captcha solution, based on JavaScript.
 * @project D-Captcha
 */
 
var MDB = MDB || {};
MDB.CAPTCHA = {};
MDB.CAPTCHA = {
			Constants: {},
			Variables: {},
			Functions: {},
			Events: {}
		};

MDB.CAPTCHA.Constants = {
	CAPTCHA_FORM_ATTRIBUTE_ID: 'captchaForm',
	SPAN_CAPTCHA_ATTRIBUTE_ID: 'captchaContainer',
	TEXT_INPUT_ATTRIBUTE_ID: 'captchaInput',
	SPAN_ERROR_ATTRIBUTE_ID: 'errorContainer',
	BUTTON_REFRESH_ATTRIBUTE_ID: 'captchaRefresh',
	EMPTY_CAPTCHA: '- Captcha code should not be empty.\n',
	UNMATCH_CAPTCHA: '- Captcha code did not match.\n',
	MATCH_BACKGROUND_COLOR: 'green',
	UNMATCH_BACKGROUND_COLOR: 'red',
	CAPTCHA_LENGTH: 5
};

MDB.CAPTCHA.Variables.errorText = '';
MDB.CAPTCHA.Variables.captchaForm = document.getElementById( MDB.CAPTCHA.Constants.CAPTCHA_FORM_ATTRIBUTE_ID );
MDB.CAPTCHA.Variables.captchaSpan = document.getElementById( MDB.CAPTCHA.Constants.SPAN_CAPTCHA_ATTRIBUTE_ID );
MDB.CAPTCHA.Variables.captchaText = document.getElementById( MDB.CAPTCHA.Constants.TEXT_INPUT_ATTRIBUTE_ID );
MDB.CAPTCHA.Variables.captchaRefresh = document.getElementById( MDB.CAPTCHA.Constants.BUTTON_REFRESH_ATTRIBUTE_ID );
MDB.CAPTCHA.Variables.captchaErrorSpan = document.getElementById( MDB.CAPTCHA.Constants.SPAN_ERROR_ATTRIBUTE_ID );

//////////////////////////////////////////////////////////////////////
//function: MDB.CAPTCHA.init.                                        //
//////////////////////////////////////////////////////////////////////
MDB.CAPTCHA.init = function() {
	MDB.CAPTCHA.Functions.generatesCaptcha( MDB.CAPTCHA.Constants.CAPTCHA_LENGTH );
	MDB.CAPTCHA.Functions.registerCaptchaEvents();
}; // End of init.

//////////////////////////////////////////////////////////////////////
//function: MDB.CAPTCHA.Functions.generatesCaptcha.   	             //
//////////////////////////////////////////////////////////////////////
MDB.CAPTCHA.Functions.generatesCaptcha = function(length) {
	//Generates the captcha function
	MDB.CAPTCHA.Variables.captchaCode = Math.floor( Math.pow( 10, length-1 ) + Math.random() * 9 * Math.pow( 10, length-1 ) ).toString();
	MDB.CAPTCHA.Variables.captchaSpan.innerHTML = MDB.CAPTCHA.Variables.captchaCode;
}; // End of generatesCaptcha.

//////////////////////////////////////////////////////////////////////
//function: MDB.CAPTCHA.Functions.registerCaptchaEvents. 	        //
//////////////////////////////////////////////////////////////////////
MDB.CAPTCHA.Functions.registerCaptchaEvents = function() {

	////////////////////////
	// On Form Submit
	MDB.CAPTCHA.Variables.captchaForm.onsubmit = function(){
		return MDB.CAPTCHA.Functions.validateForm( this );
	};
	////////////////////////

	////////////////////////
	// On Captcha Key Up.
	MDB.CAPTCHA.Variables.captchaText.onkeyup = function(){
		MDB.CAPTCHA.Functions.validateForm( MDB.CAPTCHA.Variables.captchaForm );
	};
	////////////////////////

	////////////////////////
	//On Click Refresh Button.
	MDB.CAPTCHA.Variables.captchaRefresh.onclick = function(){
		MDB.CAPTCHA.Functions.generatesCaptcha( MDB.CAPTCHA.Constants.CAPTCHA_LENGTH );
		MDB.CAPTCHA.Functions.validateForm( MDB.CAPTCHA.Variables.captchaForm );
	};
	////////////////////////

}; // End of registerCaptchaEvents.

//////////////////////////////////////////////////////////////////////
//function: MDB.CAPTCHA.Functions.validateForm.   		            //
//////////////////////////////////////////////////////////////////////
MDB.CAPTCHA.Functions.validateForm = function(captchaForm) {

	if( captchaForm.captchaInput.value === '' )
	{
		MDB.CAPTCHA.Variables.errorText = MDB.CAPTCHA.Constants.EMPTY_CAPTCHA;
	}

	if( captchaForm.captchaInput.value !== '' )
	{
		if( MDB.CAPTCHA.Functions.validateCaptcha( captchaForm.captchaInput.value ) === false )
		{
			MDB.CAPTCHA.Variables.errorText = MDB.CAPTCHA.Constants.UNMATCH_CAPTCHA;
		}
		else
		{
			MDB.CAPTCHA.Variables.errorText = '';
		}
	}

	if( MDB.CAPTCHA.Variables.errorText !== '' )
	{
		MDB.CAPTCHA.Variables.captchaSpan.style.backgroundColor = MDB.CAPTCHA.Constants.UNMATCH_BACKGROUND_COLOR;
		MDB.CAPTCHA.Variables.captchaErrorSpan.innerHTML = MDB.CAPTCHA.Variables.errorText;
		MDB.CAPTCHA.Variables.captchaErrorSpan.style.display = 'block';
		return false;
	}
	else
	{
		MDB.CAPTCHA.Variables.captchaSpan.style.backgroundColor = MDB.CAPTCHA.Constants.MATCH_BACKGROUND_COLOR;
		MDB.CAPTCHA.Variables.captchaErrorSpan.style.display = 'none';
		MDB.CAPTCHA.Variables.captchaErrorSpan.innerHTML = '';
		return true;
	}
}; // End of validateForm.

//////////////////////////////////////////////////////////////////////
//function: MDB.CAPTCHA.Functions.validateCaptcha.   	            //
//////////////////////////////////////////////////////////////////////
MDB.CAPTCHA.Functions.validateCaptcha = function() {

	var enteredValue = MDB.CAPTCHA.Variables.captchaText.value;
	
	if ( MDB.CAPTCHA.Variables.captchaCode === enteredValue )
	{
		return true;
	}
	else
	{
		return false;
	}
}; // End of validateCaptcha.

MDB.CAPTCHA.init();