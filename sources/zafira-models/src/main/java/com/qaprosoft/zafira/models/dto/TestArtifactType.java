/*******************************************************************************
 * Copyright 2013-2018 QaProSoft (http://www.qaprosoft.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package com.qaprosoft.zafira.models.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class TestArtifactType extends AbstractType
{
	private static final long serialVersionUID = 555233394837989532L;
	
	private String name;
	
	private String link;
	
	private Long testId;

	private Date expiresAt;

	public TestArtifactType()
	{
	}
	
	public TestArtifactType(String name, String link)
	{
		this(name, link, null);
	}

	public TestArtifactType(String name, String link, Date expiresAt)
	{
		this.name = name;
		this.link = link;
		this.expiresAt = expiresAt;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getLink()
	{
		return link;
	}

	public void setLink(String link)
	{
		this.link = link;
	}

	public Long getTestId()
	{
		return testId;
	}

	public void setTestId(Long testId)
	{
		this.testId = testId;
	}

	public Date getExpiresAt()
	{
		return expiresAt;
	}

	public void setExpiresAt(Date expiresAt)
	{
		this.expiresAt = expiresAt;
	}
	
	@Override
	public boolean equals(Object obj)
	{
		boolean equals = false;
		if(obj != null && obj instanceof TestArtifactType)
		{
			equals = this.name == ((TestArtifactType)obj).getName();
		}
		return equals;
	}
}