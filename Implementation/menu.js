/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// click on map Student Skills
function getMapStuSkill()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#plotStuSkillEmploy').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', '');
}

// click on map Employment
function getMapEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#plotStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldEmployMap').style('display', '');
}

// click on map Life Satisfaction
function getMapSatisf()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#plotStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', '');
}

// click on map Personal Earnings
function getMapPerEarn()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#plotStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', '');
}

// click on graph Student Skills - Employment Rate
function graphStuSkillEmploy()
{
  d3.select('#plotStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#graphStuSkillEmploy').style('display', '');
}

// click on plot Student Skills - Employment Rate
function plotStuSkillEmploy()
{
  d3.select('#graphStuSkillEmploy').style('display', 'none');
  d3.select('#worldStuSkillMap').style('display', 'none');
  d3.select('#worldEmployMap').style('display', 'none');
  d3.select('#worldPerEarnMap').style('display', 'none');
  d3.select('#worldSatisfMap').style('display', 'none');
  $('#barchart').empty();
  d3.select('#barchart').style('display', 'none');
  d3.select('#plotStuSkillEmploy').style('display', '');
}
