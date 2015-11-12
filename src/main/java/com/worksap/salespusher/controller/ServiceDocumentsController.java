package com.worksap.salespusher.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.constants.SalesPusherConstants;
import com.worksap.salespusher.entity.ServiceDocumentEntity;
import com.worksap.salespusher.repository.ServiceDocumentRepository;

@RestController
public class ServiceDocumentsController {
	private ServiceDocumentRepository serviceDocumentRepository;
	
	@Autowired
	public ServiceDocumentsController(ServiceDocumentRepository serviceDocumentRepository){
		this.serviceDocumentRepository = serviceDocumentRepository;
	}
	
	@RequestMapping(value = "/services/{serviceId}/serviceDocuments", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ServiceDocumentEntity> getServiceDocuments(@PathVariable long serviceId){
		return this.serviceDocumentRepository.findByServiceId(serviceId);
	}
	
	@RequestMapping(value = "/services/{serviceId}/serviceDocuments/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteServiceDocument(@PathVariable long id){
		/* delete actual file */
		ServiceDocumentEntity serviceDocumentEntity = this.serviceDocumentRepository.findById(id);
		File file = new File(SalesPusherConstants.SERVICE_DOCUMENT_FILE_DIRECTORY+serviceDocumentEntity.getName());   
		try{     	
    		if(file.delete()){
    			System.out.println(file.getName() + " is deleted!");
    		}else{
    			System.out.println("Delete operation is failed.");
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    	}
		/* delete database record */
		this.serviceDocumentRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}
