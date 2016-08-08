package com.qaprosoft.zafira.ws.controller;

import javax.validation.Valid;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.qaprosoft.zafira.dbaccess.dao.mysql.search.SearchResult;
import com.qaprosoft.zafira.dbaccess.dao.mysql.search.UserSearchCriteria;
import com.qaprosoft.zafira.dbaccess.model.User;
import com.qaprosoft.zafira.services.exceptions.ServiceException;
import com.qaprosoft.zafira.services.services.UserService;
import com.qaprosoft.zafira.ws.dto.UserType;

@Controller
@RequestMapping("users")
public class UsersController extends AbstractController
{
	@Autowired
	private Mapper mapper;
	
	@Autowired
	private UserService userService;
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "index", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
	public ModelAndView index()
	{
		return new ModelAndView("users/index");
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody UserType createUser(@RequestBody @Valid UserType user) throws ServiceException
	{
		return mapper.map(userService.createOrUpdateUser(mapper.map(user, User.class)), UserType.class);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value="search", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody SearchResult<User> searchUsers(@RequestBody UserSearchCriteria sc) throws ServiceException
	{
		return userService.searchUsers(sc);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value="{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody User getUser(@PathVariable(value="id") long id) throws ServiceException
	{
		return userService.getUserById(id);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value="{id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable(value="id") long id) throws ServiceException
	{
		userService.deleteUser(id);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody User updateUser(@RequestBody User user) throws ServiceException
	{
		return userService.createOrUpdateUser(user);
	}
}
