/****************************
 *      Resolution          *
 ***************************/
var resolution = 
{
    //100% 
    Screen1_100:
    {
        number:1,
        width:5888,
        height:1472,
    },
    Screen2_100:
    {
        number:2,
        width:1472,
        height:1472,
    },
    Screen3_100:
    {
        number:3,
        width:2944,
        height:1472,
    },
    Screen8_100:
    {
        number:5,
        width:1963,
        height:1472,
    },

    //75%
    Screen1_75: 
    {
        number:6,
        width:4416,
        height:1104,
    },
    Screen2_75:
    {
        number:7,
        width: 1104,
        height:1104,
    },
    Screen3_75:
    {
        number:8,
        width:1963,
        height:1104,
    },
    Screen5_75:
    {
        number:9,
        width:2208,
        height:1104,
    },
    Screen7_75:
    {
        number:10,
        width:1472,
        height:1104,
    },
    
    //50% 
    Screen1_50: 
    {
        number:11,
        width:2944,
        height:736,
    },
    Screen2_50:
    {
        number:12,
        width: 736,
        height:736,
    },
    Screen3_50:
    {
        number:13,
        width:1472,
        height:736,
    },
    Screen7_50:
    {
        number:15,
        width:980,
        height:735,
    },
    
    //IMAG
    IMAG:
    {
        number:30,
        width: 1152,
        height: 648,
    }
}
    
// Adds a "checked" symbol when clicking on a list item
window.onload = function () 
{
    //Checklist for Show Company
    var list1 = document.getElementById("showCompanyCheck");
    list1.addEventListener('click', function(ev) 
    {
        if (ev.target.tagName === 'LI') 
        {
            ev.target.classList.toggle('checked');
        }
    }, false);

}

//Check what company user selected
function checkWhichSelection()
{
    
    if( $('#selectCompany').val() === 'showCompany' )
    {
        $('#showCompany').fadeIn();
        $('#hexagon').hide();
        $('#formButton').show();
    }
    else if( $('#selectCompany').val() === 'hexagon' )
    {
        $('#hexagon').fadeIn();
        $('#showCompany').hide();
        $('#formButton').show();
    }
    else
    {
        $('#showCompany').hide();
        $('#hexagon').hide();
        $('#formButton').hide();
    }
    
}

//Check what Load-In Time user selected
function checkLoadInSelection()
{
    if( $('#selectLoadIn').val() !== 'NIL' )
    {
        $('#videoResolutionChooser').show();
        $("#selectResolutionProj").hide();
    }
    
    if($("#selectFileName").val()!=="NIL")
    {
        checkFileName()
    }
}

//Check if user selected custom or not custom resolution
function customOrNot() 
{
    if($("#selectCustom").val()==="LED")
    {
        $("#selectResolution").show()
        $("#customResolution").hide();
        $("#selectResolutionProj").hide();
    }

    else if($("#selectCustom").val()==="Custom")
    {
        $("#selectResolution").hide()
        $("#customResolution").show();
        $("#configurationErr").hide()
        $("#selectResolutionProj").hide();

        if($("#width").val().length !==0 && $("#height").val().length !==0)
        {
            $("#filenameChooser").show();
        }
        
        else
        {
            $("#filenameChooser").hide();
        }
    }

    else if($("#selectCustom").val()==="IMAG")
    {
        $("#selectResolution").hide()
        $("#customResolution").hide();
        $("#selectResolutionProj").show();
    }


    checkFileName();

}

//Check what resolution was selected   
function checkResolution()
{
    if($("#selectCustom").val()==="LED")
    {
        console.log($("#selectResolution").val())
        var resolutionArray = []
        var linearSequence = []

        for(var i=0; i<$("#selectResolution").val().length; i++)
        {
            resolutionArray.push(resolution[$("#selectResolution").val()[i]])
            linearSequence.push(resolution[$("#selectResolution").val()[i]].number)
        }
        
        console.log(resolutionArray)
        console.log(linearSequence)
        console.log(checkLinear(linearSequence))
        
        if(checkValidityOfConfiguration(linearSequence, resolutionArray))
        {
            $("#configurationErr").hide()
            $("#filenameChooser").show()
        }

        else
        {
            $("#configurationErr").show()
            $("#filenameChooser").hide()
        }
    }

    else if($("#selectCustom").val()==="IMAG")
    {
        $("#filenameChooser").show()
        $("#configurationErr").hide()
        getResolution()
    }

    if($("#selectFileName").val()!=="NIL")
    {
        checkFileName()
    }
}

//????
function getSequenceArray()
{
    console.log($("#selectResolution").val())
    var resolutionArray = []
    var linearSequence = []
    for(var i=0; i<$("#selectResolution").val().length; i++)
    {
        resolutionArray.push(resolution[$("#selectResolution").val()[i]])
        linearSequence.push(resolution[$("#selectResolution").val()[i]].number)
    }

    return ([resolutionArray,linearSequence])
}

//Checks what program user selected E.g. PP1, PP2, etc
function checkFileName()
{
    if($("#selectCustom").val()==="IMAG")
    {
        resetCopyText();
        $("#filename").hide()

        
        $("#copyText").html(
                getOption()+"_"+
                $('#selectFileName').val()+"_"+
                getResolution()[0]+"x"+
                getResolution()[1]+
                '_v'+
                customTimeStamp()            )
        }

    

    else
    {
        resetCopyText();
        $("#filename").hide()

        
        $("#copyText").html(
            getOption()+"_"+
            $('#selectFileName').val()+"_"+
            getResolution()[0]+"x"+
            getResolution()[1]+
            '_v'+
            customTimeStamp())
    }
}

//Get current time for Load-In time
function getNearestTimeStamp()
{
    var YYYYMMDD = moment(new Date()).format("YYYYMMDD");
    
    if(parseInt(moment(new Date()).format('HHmm')) > closestLoadIn($("#selectLoadIn").val()) )
    {
        var new_date = moment(new Date()).add(1, 'days');
        YYYYMMDD = moment(selectedDate).format("YYYYMMDD")
    }

    return(YYYYMMDD + closestLoadIn($("#selectLoadIn").val()).toString())
}

function customTimeStamp()
{
    var YYYYMMDD = moment(new Date()).format("YYYYMMDD");
    YYYYMMDD = document.getElementById("dateSelect").value.replace(/-/g, '');

    return(YYYYMMDD + closestLoadIn($("#selectLoadIn").val()).toString())
}

//Get closest time for Load-In time
function closestLoadIn(data)
{
    var LoadIns = [1000, 1200, 1500, 1700, 1900]
    var closestIndex = 0;

    
    if(data ==="CurrentTime")
    {
        var currentTime = parseInt(moment(new Date()).format("HHmm"))
      
        return(currentTime)
    }

    else
    {
        return parseInt(data)
    }
}

//Check resolution picked by user
function getResolution()
{
    var width = parseInt($("#width").val());
    var height= parseInt($("#height").val());
    if($("#selectCustom").val()==="LED")
    {
        width = 0
        height = getSequenceArray()[0][0].height
       
        if(checkLinear(getSequenceArray()[1]))
        {
           for(var i =0; i<getSequenceArray()[0].length; i++)
           {
               width = width + getSequenceArray()[0][i].width
           }

           width = width + 20*(getSequenceArray()[0].length-1)
           
           if($("#selectCustom").val()==="Full")
           {
               height = height*2;
           }
           return [width, height]
       }

       else
       {
           for(var i =0; i<getSequenceArray()[0].length/2; i++)
           {
               width = width + getSequenceArray()[0][i].width
           }

           width = width + 20*((getSequenceArray()[0].length/2)-1)
           return [width, height]
       }
    }

    else if($("#selectCustom").val()=="IMAG")
    {
        width = resolution[$("#selectResolutionProj").val()].width
        height = resolution[$("#selectResolutionProj").val()].height
        return [width, height]
    }

    return [width, height]
}



//Error checking
function checkValidityOfConfiguration(array, JsonArray)
{
    if(array.length!==0)
    {
        if(!checkLinear(array))
        {
            if(array.length%2===0 && !array.includes(8) && !array.includes(10) && !array.includes(12) && !array.includes(14) && !array.includes(16) && !array.includes(18)){
                var validOrNot = true;
                for(var i =0; i<array.length/2; i++)
                {
                    if(JsonArray[i].width !== JsonArray[array.length-1-i].width){
                        validOrNot = false;
                    }
                }
                return validOrNot;
            }

            else
            {
                return false;
            }
        }

        else
        {
            return true
        }
    }

    else
    {
        return false
    }
}

//??????
function checkLinear(array)
{
    var commonDiff = 1;
    var newCommonDiff =0;
    if(array.length >=2){
        for(var i=0; i<array.length-1; i++)
        {
            newCommonDiff = array[i+1]-array[i]
            if(commonDiff!==newCommonDiff)
            {
                return false
            }
        }
        return true
    }
    else
    {
        if(array.length >= 0)
        {
            return true
        }

        else
        {
            return false
        }
    } 
}
 
//To go next page
function nextPage()
{
    let parent1 = document.querySelector(".parent1"),
        parent2 = document.querySelector(".parent2");
    if($('#selectCompany').val() === 'showCompany')
    {
        if (parent1.children.length == parent1.querySelectorAll(".checked").length) 
        {
            $('#page1').hide();
            $('#page2').fadeIn();
        }

        else
        {
            Swal.fire
            ({
                icon: 'error',
                title: 'Oops...',
                text: 'Please make sure you\'ve checked all checklist items!',
            })
        }
    }
}

//what option?
function getOption() {
    selectElement = document.querySelector('#selectCustom');
    output = selectElement.value;
    return(output)
}

//refreshes page after new render btn is clicked
function refresh()
{

    location.reload();
}

//Making concatinated file name



//Reset copytext to allow new text to be generated and copied
function resetCopyText()
{
    $("#copyText").html("Choose/Type File name...")
    
}

//Allows user to copy text by click
function copyTextFunc()
{
    $('#copy').show();
    $('#copy').val($('#copyText').html())
    var copyText = document.getElementById("copy");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    $('#copied').hide();
    $('#copied').fadeIn();
    $('#copied').html('Copied!')
    $('#copy').hide();
}
    
    
