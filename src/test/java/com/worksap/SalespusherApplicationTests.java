package com.worksap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import com.worksap.salespusher.SalespusherApplication;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SalespusherApplication.class)
@WebAppConfiguration
public class SalespusherApplicationTests {

	@Test
	public void contextLoads() {
	}

}
