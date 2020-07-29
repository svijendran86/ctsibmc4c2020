package com.crisiscom.rest.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.websocket.server.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.crisiscom.rest.exception.CCNotFoundException;
import com.crisiscom.rest.model.ContactVo;
import com.crisiscom.rest.model.FitbitVo;
import com.crisiscom.rest.model.PieChart;
import com.crisiscom.rest.model.PrefVo;
import com.crisiscom.rest.service.CriscomService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class CrisiscomController {

	@Autowired
	CriscomService service;

	@RequestMapping(value = "/pref/all", method = RequestMethod.GET)
	public List<PrefVo> getAllPreferences() {
		try {
			System.out.println(this.getClass().getSimpleName() + " - Get all preference service is invoked.");
			return service.getPreferences();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/pref/{userid}", method = RequestMethod.GET)
	public List<PrefVo> getPreferenceById(@PathVariable String userid) throws Exception {
		System.out.println(this.getClass().getSimpleName() + " - Get pref details by user id is invoked.");

		List<PrefVo> pref = service.getPrefById(userid);
		if (pref == null )
			throw new CCNotFoundException("Could not find preference with id- " + userid);

		return pref;
	}

	@RequestMapping(value = "/pref/add", method = RequestMethod.POST)
	public PrefVo createPreference(@RequestBody PrefVo pref) {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Create new pref method is invoked.");
		return service.addPreference(pref);
	} catch (Exception e) {
		throw new CCNotFoundException(e.getMessage());
	}
	}

	@RequestMapping(value = "/pref/update/{id}", method = RequestMethod.PUT)
	public PrefVo updatePreference(@RequestBody PrefVo updpref, @PathVariable String id) throws Exception {
		System.out.println(this.getClass().getSimpleName() + " - Update pref details by id is invoked.");
		try {
		Optional<PrefVo> pref = service.getPrefVal(id, updpref.getPrefName());
		if (!pref.isPresent())
			throw new Exception("Could not find pref with id- " + id);

		/*
		 * IMPORTANT - To prevent the overiding of the existing value of the variables
		 * in the database, if that variable is not coming in the @RequestBody
		 * annotation object.
		 */
		/*
		 * if(updemp.getName() == null || updemp.getName().isEmpty())
		 * updemp.setName(emp.get().getName()); if(updemp.getDepartment() == null ||
		 * updemp.getDepartment().isEmpty())
		 * updemp.setDepartment(emp.get().getDepartment()); if(updemp.getSalary() == 0)
		 * updemp.setSalary(emp.get().getSalary());
		 */

		// Required for the "where" clause in the sql query template.
		updpref.setUserId(id);
		return service.updatePrefernce(updpref);
	} catch (Exception e) {
		throw new CCNotFoundException(e.getMessage());
	}
	}

	@RequestMapping(value = "/pref/delete/{id}", method = RequestMethod.DELETE)
	public void deletePrefById(@PathVariable String id) throws Exception {
		System.out.println(this.getClass().getSimpleName() + " - Delete pref by id is invoked.");
		try {
		List<PrefVo> emp = service.getPrefById(id);
		if (emp == null)
			throw new Exception("Could not find pref with id- " + id);

		service.deletePrefById(id);
	} catch (Exception e) {
		throw new CCNotFoundException(e.getMessage());
	}
	}

	@RequestMapping(value = "/pref/delete/all", method = RequestMethod.DELETE)
	public void deleteAll() {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Delete all preferences is invoked.");
		service.deleteAllPreferences();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/pref/{userid}/{prefname}", method = RequestMethod.GET)
	public PrefVo getPreferenceByIdAndName(@PathVariable String userid, @PathVariable String prefname)
			throws Exception {
		System.out.println(this.getClass().getSimpleName() + " - Get pref details by idName is invoked.");
		try {
			Optional<PrefVo> pref = service.getPrefVal(userid, prefname);
			if (!pref.isPresent())
				throw new Exception("Could not find preference with id- " + userid);

			return pref.get();
		} catch (Exception e) {
			System.out.println(e);
			throw new CCNotFoundException(e.getMessage());
		}
	}
	
	@RequestMapping(value = "/pref/delete/{userid}/{prefname}", method = RequestMethod.DELETE)
	public void delPreferenceByIdAndName(@PathVariable String userid, @PathVariable String prefname)
			throws Exception {
		System.out.println(this.getClass().getSimpleName() + " - delete pref details by idName is invoked.");
		try {
			Optional<PrefVo> pref = service.getPrefVal(userid, prefname);
			if (!pref.isPresent())
				throw new Exception("Could not find preference with id- " + userid);

			service.deletePrefVal(userid, prefname);
			
		} catch (Exception e) {
			System.out.println(e);
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/getCustomerHeartRate/{clientid}&{token}", method = RequestMethod.GET)
	public Response getCustomerHeartRate(@PathParam("clientid") String clientid, @PathParam("token") String token) {
		JSONObject outputJson = new JSONObject();
		try {
			URL url = new URL("https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Authorization", "Bearer " + token);
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			String output;
			while ((output = br.readLine()) != null) {
				JSONObject inputJson = new JSONObject(output);
				System.out.println(inputJson.toString());
				JSONArray jsonArray = inputJson.getJSONArray("activities-heart");
				JSONArray labelArray = new JSONArray();
				JSONArray jsonArray1 = new JSONArray();
				JSONObject minDataJsons = new JSONObject();
				JSONObject maxDataJsons = new JSONObject();
				JSONArray minArray = new JSONArray();
				JSONArray maxArray = new JSONArray();
				JSONArray dataSetArray = new JSONArray();
				for (int i = 0; i < jsonArray.length(); i++) {
					JSONObject inputDateTime = jsonArray.getJSONObject(i);
					String date = inputDateTime.getString("dateTime");
					labelArray.put(date.replace("-", "/"));
					JSONObject jsonValueJson = inputDateTime.getJSONObject("value");
					jsonArray1 = jsonValueJson.getJSONArray("heartRateZones");
					JSONObject dataJson = jsonArray1.getJSONObject(1);
					maxArray.put(dataJson.getInt("max"));
					minArray.put(dataJson.getInt("min"));
				}
				minDataJsons.put("data", minArray);
				minDataJsons.put("color", "(opacity = 1) => `rgba(134, 65, 244, ${opacity})`");
				maxDataJsons.put("data", maxArray);
				maxDataJsons.put("color", "(opacity = 1) => `rgba(134, 65, 244, ${opacity})`");
				dataSetArray.put(minDataJsons);
				dataSetArray.put(maxDataJsons);
				outputJson.put("datasets", dataSetArray);
				outputJson.put("labels", labelArray);
				System.out.println(outputJson.toString());
			}
			conn.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return Response.status(204).entity(outputJson.toString()).build();

	}

	@RequestMapping(value = "/GetHrtMsg/json_data", method = RequestMethod.POST)
	@Produces("application/json")
	@Consumes("application/json")
	public ResponseEntity<String> gethrtmessage(InputStream incomingData) {
        JSONObject outputJson = new JSONObject();
        try {
        	BufferedReader br = new BufferedReader(new InputStreamReader((incomingData)));

            String output;



            while ((output = br.readLine()) != null) {

                  JSONObject inputJson = new JSONObject(output);

                  JSONArray jsonArray = inputJson.getJSONArray("activities-heart");

                  List<String> healthStatusList = new ArrayList<String>();

                  JSONArray labelArray = new JSONArray();

                  JSONArray jsonArray1 = new JSONArray();

                  JSONObject minDataJsons = new JSONObject();

                  JSONObject maxDataJsons = new JSONObject();

                  JSONArray minArray = new JSONArray();

                  JSONArray maxArray = new JSONArray();

                  JSONArray dataSetArray = new JSONArray();

                  for (int i = 0; i < jsonArray.length(); i++) {

                         JSONObject inputDateTime = jsonArray.getJSONObject(i);

                         String date = inputDateTime.getString("dateTime");

                         labelArray.put(date.replace("-", "/"));



                         JSONObject jsonValueJson = inputDateTime.getJSONObject("value");

                         jsonArray1 = jsonValueJson.getJSONArray("heartRateZones");

                         JSONObject dataJson = jsonArray1.getJSONObject(1);

                         maxArray.put(dataJson.getInt("max"));

                         minArray.put(dataJson.getInt("min"));

                         if (dataJson.getInt("max") <= 135 ) {

                                healthStatusList.add("true");

                         } else {
                                healthStatusList.add("false");
                         }
                  }

                  int healthStatusCount = Collections.frequency(healthStatusList, "true");
                  minDataJsons.put("data", minArray);
                  minDataJsons.put("color", "(opacity = 1) => `rgba(134, 65, 244, ${opacity})`");
                  maxDataJsons.put("data", maxArray);
                  maxDataJsons.put("color", "(opacity = 1) => `rgba(134, 65, 244, ${opacity})`");
                  dataSetArray.put(minDataJsons);
                  dataSetArray.put(maxDataJsons);
                  outputJson.put("datasets", dataSetArray);
                  outputJson.put("labels", labelArray);
                  if (healthStatusCount > 3) {
                         outputJson.put("healthstatus", "You are Healthy");
                  } else {
                         outputJson.put("healthstatus", "You are not Healthy");
                  }
            }
            br.close();
     } catch (IOException e) {
            e.printStackTrace();
     }
        return ResponseEntity.status(200).body(outputJson.toString());

}

	@Consumes("application/json")
	@Produces("application/json")
	@RequestMapping(value = "/GetSlpMsg/json_data", method = RequestMethod.POST)
	public ResponseEntity<String> getsleepmessage(InputStream incomingData) {
		String outputJson = null;
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader((incomingData)));
			String output;
			JSONObject jsonstages = new JSONObject();
			while ((output = br.readLine()) != null) {
				JSONObject inputJson = new JSONObject(output);
				System.out.println(inputJson.toString());
				JSONObject jsonArray = inputJson.getJSONObject("summary");
				jsonstages = jsonArray.getJSONObject("stages");
			}
			PieChart pieChart = new PieChart();
			pieChart.setSleeptype("deep");
			pieChart.setSleeptime(Integer.parseInt(jsonstages.get("deep").toString()));
			pieChart.setColor("'rgba(131, 167, 234, 1)'");
			pieChart.setLegendFontColor("'#7F7F7F'");
			pieChart.setLegendFontSize(15);

			PieChart pieChart1 = new PieChart();
			pieChart1.setSleeptype("light");
			pieChart1.setSleeptime(Integer.parseInt(jsonstages.get("light").toString()));
			pieChart1.setColor("'#F00'");
			pieChart1.setLegendFontColor("'#7F7F7F'");
			pieChart1.setLegendFontSize(15);

			PieChart pieChart2 = new PieChart();
			pieChart2.setSleeptype("rem");
			pieChart2.setSleeptime(Integer.parseInt(jsonstages.get("rem").toString()));
			pieChart2.setColor("'red'");
			pieChart2.setLegendFontColor("'#7F7F7F'");
			pieChart2.setLegendFontSize(15);

			PieChart pieChart3 = new PieChart();
			pieChart3.setSleeptype("wake");
			pieChart3.setSleeptime(Integer.parseInt(jsonstages.get("wake").toString()));
			pieChart3.setColor("'#F00'");
			pieChart3.setLegendFontColor("'#7F7F7F'");
			pieChart3.setLegendFontSize(15);

			List<PieChart> list = new ArrayList<PieChart>();
			list.add(pieChart);
			list.add(pieChart1);
			list.add(pieChart2);
			list.add(pieChart3);

			ObjectMapper objectMapper = new ObjectMapper();
			try {
				outputJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(list);

			} catch (Exception e) {
				e.printStackTrace();
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// return Response.status(204).entity(outputJson).build();
		return ResponseEntity.status(200).body(outputJson);

	}

	@RequestMapping(value = "/fitbit/add", method = RequestMethod.POST)
	public FitbitVo addFbData(@RequestBody FitbitVo fb) {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Create new fitbit method is invoked.");
		return service.addfb(fb);
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbitcontact/add", method = RequestMethod.POST)
	public ContactVo addFbConData(@RequestBody ContactVo cfb) {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Create new contact fitbit method is invoked.");
		return service.addfbc(cfb);
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbit/all", method = RequestMethod.GET)
	public List<FitbitVo> getAllFb() {
		try {
			System.out.println(this.getClass().getSimpleName() + " - Get all FitbitVo service is invoked.");
			return service.getFbData();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbit/{userid}", method = RequestMethod.GET)
	public FitbitVo getFbById(@PathVariable String userid) throws Exception {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Get fb details by id is invoked.");

		Optional<FitbitVo> pref = service.getfbById(userid);
		if (!pref.isPresent())
			throw new Exception("Could not find fitbit with id- " + userid);

		return pref.get();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbit/update/{id}", method = RequestMethod.PUT)
	public FitbitVo updatefb(@RequestBody FitbitVo updpref, @PathVariable String id) throws Exception {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Update fitbit details by id is invoked.");

		Optional<FitbitVo> pref = service.getfbById(id);
		if (!pref.isPresent())
			throw new Exception("Could not find fitbit with id- " + id);

		// Required for the "where" clause in the sql query template.
		updpref.setUserId(id);
		return service.updateFb(updpref);
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbit/delete/{id}", method = RequestMethod.DELETE)
	public void deleteFbById(@PathVariable String id) throws Exception {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Delete fitbit by id is invoked.");

		Optional<FitbitVo> emp = service.getfbById(id);
		if (!emp.isPresent())
			throw new Exception("Could not find fitbit with id- " + id);

		service.deleteFbById(id);
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbit/delete/all", method = RequestMethod.DELETE)
	public void deleteAllFb() {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Delete all fitbit is invoked.");
		service.deleteAllFbData();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbitcontact/delete/all", method = RequestMethod.DELETE)
	public void deleteAllCFb() {
		try {
		System.out.println(this.getClass().getSimpleName() + " - Delete all fiybitcontact is invoked.");
		service.deleteAllCFbData();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}

	@RequestMapping(value = "/fitbitcontact/all", method = RequestMethod.GET)
	public List<ContactVo> getAllCFb() {
		try {
			System.out.println(this.getClass().getSimpleName() + " - Get all FitbitcontactVo service is invoked.");
			return service.getCFbData();
		} catch (Exception e) {
			throw new CCNotFoundException(e.getMessage());
		}
	}
	
	@Consumes("application/json")
	@Produces("application/json")
	@RequestMapping(value = "/GetHealthStatus/json_data", method = RequestMethod.POST)
	public ResponseEntity<String> getHealthStaus(InputStream incomingData) {

        JSONObject outputJson = new JSONObject();

        try {
                        BufferedReader br = new BufferedReader(new InputStreamReader((incomingData)));
                        String output;
                        JSONObject inputJson = new JSONObject();
                        while ((output = br.readLine()) != null) {
                                        inputJson = new JSONObject(output);
                        }
                                        JSONObject jsonArray = inputJson.getJSONObject("activities-heart-intraday");
                                        ObjectMapper mapper = new ObjectMapper();
                 Map<String, Object> jsonMap = new HashMap<String, Object>();
                 jsonMap = mapper.readValue(jsonArray.toString(), new TypeReference<Map<String, Object>>(){});
                 List<HashMap<String,Integer>> heartdetails = (List<HashMap<String, Integer>>) jsonMap.get("dataset");
                 List<String> heartvalues = new ArrayList<String>();
                 for(int i = 0; i < heartdetails.size(); i++) {
                       if( heartdetails.get(i).get("value")>135){
                                       heartvalues.add("nothealthy");
                       }else{
                                       heartvalues.add("healthy");
                       };
                 }

                 int healthStatusCount = Collections.frequency(heartvalues, "healthy");
                 int NothealthStatusCount = Collections.frequency(heartvalues, "nothealthy");
                 if(NothealthStatusCount>healthStatusCount){
                        outputJson.put("HealthStatus", "Your Heart rate shows that you might have Tachycardia.  Tachycardia is a condition that makes your heart beat more than 100 times per minute."
                                                       + "A rapid heart rate doesn’t always need treatment. But sometimes it can be life-threatening. So play it safe -- let your doctor know right away if you have any type of irregular heartbeat.");
                 }else{
                        outputJson.put("HealthStatus", "Heart rate is normal");
                 }
                        br.close();

        } catch (IOException e) {

                        e.printStackTrace();

        }



       // return Response.status(204).entity(outputJson.toString()).build();
        return ResponseEntity.status(200).body(outputJson.toString());

}

}