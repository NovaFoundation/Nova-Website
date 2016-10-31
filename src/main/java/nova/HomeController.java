package nova;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import org.joda.time.LocalTime;

@Controller
@EnableAutoConfiguration
public class HomeController
{
	@RequestMapping("/")
	@ResponseBody
	String home()
	{
		LocalTime currentTime = new LocalTime();
		
		return "The current local time is: " + currentTime;
	}
	
	public static void main(String[] args) throws Exception
	{
		SpringApplication.run(HomeController.class, args);
	}
}