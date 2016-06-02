/*
 * Programmeerproject
 * Jaap Nieuwenhuizen
 */

// click on map Student Skills
function getMapStuSkill()
{
  d3.select("#graph_StuSkill_Employ").style('display', 'none');
  // d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldEmployMap").style("display", "none");
  d3.select("#WorldPerEarnMap").style("display", "none");
  d3.select("#WorldSatisfMap").style("display", "none");
  d3.select("#WorldStuSkillMap").style("display", "");
}

// click on map Employment
function getMapEmploy()
{
  d3.select("#graph_StuSkill_Employ").style('display', 'none');
  // d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldStuSkillMap").style("display", "none");
  d3.select("#WorldSatisfMap").style("display", "none");
  d3.select("#WorldPerEarnMap").style("display", "none");
  d3.select("#WorldEmployMap").style("display", "");
}

// click on map Life Satisfaction
function getMapSatisf()
{
  d3.select("#graph_StuSkill_Employ").style('display', 'none');
  // d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldStuSkillMap").style("display", "none");
  d3.select("#WorldEmployMap").style("display", "none");
  d3.select("#WorldPerEarnMap").style("display", "none");
  d3.select("#WorldSatisfMap").style("display", "");
}

// click on map Personal Earnings
function getMapPerEarn()
{
  d3.select("#graph_StuSkill_Employ").style('display', 'none');
  // d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldStuSkillMap").style("display", "none");
  d3.select("#WorldEmployMap").style("display", "none");
  d3.select("#WorldSatisfMap").style("display", "none");
  d3.select("#WorldPerEarnMap").style("display", "");
}

// click on graph Student Skills - Employment Rate
function graph_StuSkill_Employ()
{
  d3.select("#WorldStuSkillMap").style("display", "none");
  // d3.select("#graph_GDP_FootP").style("display", "none");
  d3.select("#WorldEmployMap").style("display", "none");
  d3.select("#WorldSatisfMap").style("display", "none");
  d3.select("#WorldPerEarnMap").style("display", "none");
  d3.select("#graph_StuSkill_Employ").style("display", "");
}

// click on graph gdp - foodprint
/*
function graph_GDP_FootP()
{
  d3.select("#WorldStuSkillMap").style("display", "none");
  d3.select("#graph_StuSkill_Employ").style("display", "none");
  d3.select("#WorldEmployMap").style("display", "none");
  d3.select("#WorldSatisfMap").style("display", "none");
  d3.select("#WorldPerEarnMap").style("display", "none");
  d3.select("#graph_GDP_FootP").style("display", "");
}
*/
