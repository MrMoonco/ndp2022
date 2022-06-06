/****************************
 *      Resolution          *
 ***************************/
var resolution = 
{
    //50% Zoom
    Screen1_50: 
    {
        number:29,
        width:2944,
        height:736,
    },
    Screen2_50:
    {
        number:30,
        width: 736,
        height:736,
    },
    Screen3_50:
    {
        number:31,
        width:1472,
        height:736,
    },
    Screen4_50:
    {
        number:32,
        width:736,
        height:736,
    },
    Screen5_50:
    {
        number:33,
        width:1472,
        height:736,
    },
    Screen6_50:
    {
        number:34,
        width:1472,
        height:736,
    },
    Screen7_50:
    {
        number:35,
        width:980,
        height:735,
    },
    Screen8_75:
    {
        number:36,
        width:980,
        height:735,
    },
    Screen9_50:
    {
        number:37,
        width:980,
        height:735,
    },
    
    //75% Zoom
    Screen1_75: 
    {
        number:1,
        width:4416,
        height:1104,
    },
    Screen2_75:
    {
        number:2,
        width: 1104,
        height:1104,
    },
    Screen3_75:
    {
        number:3,
        width:2208,
        height:1104,
    },
    Screen4_75:
    {
        number:4,
        width:1104,
        height:1104,
    },
    Screen5_75:
    {
        number:5,
        width:2208,
        height:1104,
    },
    Screen6_75:
    {
        number:8,
        width:2208,
        height:1104,
    },
    Screen7_75:
    {
        number:9,
        width:1472,
        height:1104,
    },
    Screen8_75:
    {
        number:10,
        width:1472,
        height:1104,
    },
    Screen9_75:
    {
        number:10,
        width:1472,
        height:1104,
    },
    // 100% Zoom
    Screen1_100:
    {
        number:12,
        width:5888,
        height:1472,
    },
    Screen2_100:
    {
        number:14,
        width:1472,
        height:1472,
    },
    Screen3_100:
    {
        number:16,
        width:2944,
        height:1472,
    },
    Screen4_100:
    {
        number:18,
        width:1472,
        height:1472,
    },
    Screen5_100:
    {
        number:20,
        width:2944,
        height:1472,
    },
    Screen6_100:
    {
        number:22,
        width:2944,
        height:1472,
    },
    Screen7_100:
    {
        number:24,
        width:1963,
        height:1472,
    },
    Screen8_100:
    {
        number:26,
        width:1963,
        height:1472,
    },
    Screen9_100:
    {
        number:28,
        width:1963,
        height:1472,
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
    
    //Checklist for Hexagon Company
    var list2 = document.getElementById('hexagonCheck');
    list2.addEventListener('click', function(ev) 
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
    if($("#selectCustom").val()==="Fixed" || $("#selectCustom").val()==="Full")
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

    else if($("#selectCustom").val()==="Projection")
    {
        $("#selectResolution").hide()
        $("#customResolution").hide();
        $("#selectResolutionProj").show();
    }

    else if($("#selectCustom").val()==="MediaCorp")
    {
        $("#selectResolution").hide()
        $("#customResolution").hide();
        $("#selectResolutionProj").hide();
        $("#filenameChooser").show();
    }

    checkFileName();

}

//Check what resolution was selected   
function checkResolution()
{
    if($("#selectCustom").val()==="Fixed" || $("#selectCustom").val()==="Full")
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

    else if($("#selectCustom").val()==="Projection")
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
    if($("#selectFileName").val()==="Custom")
    {
        $("#filename").show()
        resetCopyText();
    }

    else
    {
        resetCopyText();
        $("#filename").hide()

        if($("#selectFileName").val()!=="NIL" && $("#selectCustom").val()!=="Projection")
        {
            $("#copyText").html(
                $('#selectFileName').val()+"_"+
                getResolution()[0]+"x"+
                getResolution()[1]+
                '_v'+
                getNearestTimeStamp()+
                $("#selectExtension").val()
            )
        }

        else if($("#selectFileName").val()!=="NIL" && $("#selectCustom").val()==="Projection")
        {
            $("#copyText").html(
                $('#selectFileName').val()+"_"+
                getResolution()[0]+"x"+
                getResolution()[1]+
                '_v'+
                getNearestTimeStamp()+
                $("#selectExtension").val()
            )
        }
    
    }
}

//Get current time for Load-In time
function getNearestTimeStamp()
{
    var YYYYMMDD = moment(new Date()).format("YYYYMMDD");
    
    if(parseInt(moment(new Date()).format('HHmm')) > closestLoadIn($("#selectLoadIn").val()) )
    {
        var new_date = moment(new Date()).add(1, 'days');
        YYYYMMDD = moment(new_date).format("YYYYMMDD")
    }

    return(YYYYMMDD + closestLoadIn($("#selectLoadIn").val()).toString())
}

//Get closest time for Load-In time
function closestLoadIn(data)
{
    var LoadIns = [1000, 1200, 1500, 1700, 1900]
    var closestIndex = 0;

    if(data==="Auto")
    {
        var currentTime = parseInt(moment(new Date()).format("HHmm"))
        
        for(var i =LoadIns.length-1; i>0; i--)
        {
            if(currentTime < LoadIns[i]){
                closestIndex = i
            }
        }
        return LoadIns[closestIndex]
    }

    else if(data ==="CurrentTime")
    {
        return(parseInt(moment(new Date()).format("HHmm")))
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
    if($("#selectCustom").val()==="Fixed" || $("#selectCustom").val()==="Full")
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

    if($("#selectCustom").val()==="MediaCorp")
    {
        width = 1920
        height = 1080
        return [width, height]
    }

    if($("#selectCustom").val()=="Projection")
    {
        width = resolution[$("#selectResolutionProj").val()].width
        height = resolution[$("#selectResolutionProj").val()].height
        return [width, height]
    }

    return [width, height]
}

//For custom resolution
function getCustomResolution()
{
    if($("#width").val().length !== 0 && $("#height").val().length !== 0)
    {
        $("#filenameChooser").show()
        checkFileName();
    }
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
                text: 'Please make sure you\'ve configured the files properly',
            })
        }
    }
    
    if($('#selectCompany').val() === 'hexagon')
    {
        if (parent2.children.length == parent2.querySelectorAll(".checked").length) 
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
                text: 'Please make sure you\'ve configured the files properly',
            })
        }
    }
}

//refreshes page after new render btn is clicked
function refresh()
{
    location.reload();
}

//Making concatinated file name
function generateCopyText()
{
    $("#copyText").html(    
        $('#filename').val().toUpperCase()+"_"+
        getResolution()[0]+"x"+
        getResolution()[1]+
        '_v'+
        getNearestTimeStamp()
    )
}

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
    $('#copied').html('Copied!</p>')
    $('#copy').hide();
}
    
    
