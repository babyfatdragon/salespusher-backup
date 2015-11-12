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
import com.worksap.salespusher.entity.DealDocumentEntity;
import com.worksap.salespusher.repository.DealDocumentRepository;

@RestController
public class DealDocumentController {
	private DealDocumentRepository dealDocumentRepository;
	
	@Autowired
	public DealDocumentController(DealDocumentRepository dealDocumentRepository) {
		this.dealDocumentRepository = dealDocumentRepository;
	}
	
	@RequestMapping(value = "/deals/{dealId}/dealDocuments", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealDocumentEntity> getDealDocuments(@PathVariable long dealId){
		return this.dealDocumentRepository.findByDealId(dealId);
	}
	
	@RequestMapping(value = "/deals/{dealId}/dealDocuments/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDealDocument(@PathVariable long id){
		/* delete actual file */
		DealDocumentEntity dealDocumentEntity = this.dealDocumentRepository.findById(id);
		File file = new File(SalesPusherConstants.DEAL_DOCUMENT_FILE_DIRECTORY+dealDocumentEntity.getName());   
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
		this.dealDocumentRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
}
