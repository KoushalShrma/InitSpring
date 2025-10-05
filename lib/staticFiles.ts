import { ProjectConfig } from "../types";

export const getMainApplicationContent = (config: ProjectConfig, mainClassName: string): string => `
package ${config.packageName};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ${mainClassName}Application {

    public static void main(String[] args) {
        SpringApplication.run(${mainClassName}Application.class, args);
    }

}
`;

export const getApplicationPropertiesContent = (): string => `
# Server Configuration
server.port=8080

# Database Configuration (Update with your details)
# H2 (In-Memory) Example:
# spring.datasource.url=jdbc:h2:mem:testdb
# spring.datasource.driverClassName=org.h2.Driver
# spring.datasource.username=sa
# spring.datasource.password=password
# spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# MySQL Example:
# spring.datasource.url=jdbc:mysql://localhost:3306/your_database?useSSL=false&serverTimezone=UTC
# spring.datasource.username=your_username
# spring.datasource.password=your_password
# spring.jpa.hibernate.ddl-auto=update
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# PostgreSQL Example:
# spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
# spring.datasource.username=your_username
# spring.datasource.password=your_password
# spring.jpa.hibernate.ddl-auto=update
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JPA/Hibernate Configuration
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
`;


export const MVNW_SCRIPT = `#!/usr/bin/env sh
#
# Copyright 2012-2022 The Apache Software Foundation.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# --------------------------------------------------------------------------------------------------
#
# Maven Wrapper Script
#
# --------------------------------------------------------------------------------------------------

MAVEN_WRAPPER_JAR_URL_SYSTEM_PROPERTY="maven.wrapper.jar.url"
MAVEN_WRAPPER_JAR_PATH_SYSTEM_PROPERTY="maven.wrapper.jar.path"
MAVEN_WRAPPER_PROPERTIES_PATH_SYSTEM_PROPERTY="maven.wrapper.properties.path"
MAVEN_WRAPPER_VERBOSE_SYSTEM_PROPERTY="maven.wrapper.verbose"

# The behavior of the script can be altered by defining the following environment variables:
#
# - MVNW_REPOURL - alternate Maven repository URL.
#   This is the repository where the maven-wrapper.jar is downloaded from.
#
# - MVNW_VERBOSE - if set to "true", the script will be more verbose.
#
# Read function defined in the current script.
# Arguments:
#   $1 - path to the properties file
read_property() {
  if [ -f "$1" ]; then
    grep "^$2=" "$1" | cut -d'=' -f2- | sed 's/\\r$//'
  fi
}

# The value of the property, will be empty if the property is not found.
# Arguments:
#   $1 - path to the properties file
#   $2 - name of the property to read
#
# E.g.
#   MVNW_REPOURL=\`read_property "\${MAVEN_WRAPPER_PROPERTIES_FILE}" "wrapperUrl"\`
download() {
  if [ -z "$3" ]; then
    printf "Downloading %s\\n" "$1"
  else
    printf "Downloading %s to %s\\n" "$1" "$3"
  fi

  # In case of proxy, the "wget" command is used as it is able to read proxy settings from environment variables.
  # The "curl" command is used as a fallback, because it is more widespread than "wget".
  if [ -n "$3" ] && command -v wget >/dev/null 2>&1; then
    wget -q -O "$3" "$1"
  elif [ -n "$3" ] && command -v curl >/dev/null 2>&1; then
    curl -q -f -L -s -S -o "$3" "$1"
  elif command -v wget >/dev/null 2>&1; then
    wget -q "$1"
  elif command -v curl >/dev/null 2>&1; then
    curl -q -f -L -s -S -O "$1"
  else
    printf "ERROR: Cannot download '%s'. Neither 'curl' nor 'wget' were found in the PATH.\\n" "$1"
    return 1
  fi
}

# Print a message, if the verbose mode is enabled.
# Arguments:
#   $1 - message to print
log_verbose() {
  if [ "\${MVNW_VERBOSE}" = "true" ]; then
    printf "[MVNW] %s\\n" "$1"
  fi
}

# Run the Maven command.
# Arguments:
#   $@ - arguments to pass to the Maven command
#
# E.g.
#   run_maven --version
#   run_maven clean install
run_maven() {
  log_verbose "Running Maven"
  # shellcheck disable=SC2068
  "\${JAVA_HOME}/bin/java" \\
    "-Dfile.encoding=UTF-8" \\
    \${MAVEN_OPTS} \\
    -classpath "\${MAVEN_WRAPPER_JAR_FILE}" \\
    "-D\${MAVEN_WRAPPER_JAR_PATH_SYSTEM_PROPERTY}=\${MAVEN_WRAPPER_JAR_FILE}" \\
    "-D\${MAVEN_WRAPPER_PROPERTIES_PATH_SYSTEM_PROPERTY}=\${MAVEN_WRAPPER_PROPERTIES_FILE}" \\
    "-D\${MAVEN_WRAPPER_VERBOSE_SYSTEM_PROPERTY}=\${MVNW_VERBOSE}" \\
    org.apache.maven.wrapper.MavenWrapperMain \\
    "$@"
  MAVEN_PROCESS_EXIT_CODE=$?
  if [ \${MAVEN_PROCESS_EXIT_CODE} -ne 0 ]; then
    log_verbose "Maven process exited with code \${MAVEN_PROCESS_EXIT_CODE}"
    return \${MAVEN_PROCESS_EXIT_CODE}
  fi
}

# --------------------------------------------------------------------------------------------------
#
# Main script
#
# --------------------------------------------------------------------------------------------------
# The sed commands in this script are not compatible with BSD sed, i.e. on macOS.
# Let's check for gsed, and if it's not available, remind the user to install it.
if ! sed -i -e "s/ / /" "$0" >/dev/null 2>&1 && ! command -v gsed >/dev/null 2>&1; then
  printf "ERROR: The 'sed' command of this system is not compatible with the script.\\n"
  printf "Please install 'gsed' and make it available in the PATH.\\n"
  exit 1
fi

# The directory where the script is located.
MAVEN_WRAPPER_SCRIPT_DIR=\`cd -- "$(dirname -- "$0")" && pwd\`
log_verbose "Script directory is '\${MAVEN_WRAPPER_SCRIPT_DIR}'"

# The path to the wrapper properties file.
MAVEN_WRAPPER_PROPERTIES_FILE="\${MAVEN_WRAPPER_SCRIPT_DIR}/.mvn/wrapper/maven-wrapper.properties"
log_verbose "Wrapper properties file is '\${MAVEN_WRAPPER_PROPERTIES_FILE}'"

# If the wrapper properties file does not exist, then exit.
if [ ! -f "\${MAVEN_WRAPPER_PROPERTIES_FILE}" ]; then
  printf "ERROR: The wrapper properties file '%s' does not exist.\\n" "\${MAVEN_WRAPPER_PROPERTIES_FILE}"
  exit 1
fi

# The path to the wrapper jar file.
MAVEN_WRAPPER_JAR_FILE="\${MAVEN_WRAPPER_SCRIPT_DIR}/.mvn/wrapper/maven-wrapper.jar"
log_verbose "Wrapper jar file is '\${MAVEN_WRAPPER_JAR_FILE}'"

# If the wrapper jar file does not exist, then download it.
if [ ! -f "\${MAVEN_WRAPPER_JAR_FILE}" ]; then
  MVNW_REPOURL_PROPERTY=\`read_property "\${MAVEN_WRAPPER_PROPERTIES_FILE}" "wrapperUrl"\`
  if [ -n "\${MVNW_REPOURL}" ]; then
    MAVEN_WRAPPER_JAR_URL="\${MVNW_REPOURL}"
    log_verbose "Using MVNW_REPOURL environment variable: '\${MVNW_REPOURL}'"
  elif [ -n "\${MVNW_REPOURL_PROPERTY}" ]; then
    MAVEN_WRAPPER_JAR_URL="\${MVNW_REPOURL_PROPERTY}"
    log_verbose "Using 'wrapperUrl' property: '\${MVNW_REPOURL_PROPERTY}'"
  else
    # This should not happen, because the properties file should contain the wrapperUrl property.
    # The default value is provided as a fallback.
    MAVEN_WRAPPER_JAR_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"
    log_verbose "Using default wrapper URL: '\${MAVEN_WRAPPER_JAR_URL}'"
  fi
  download "\${MAVEN_WRAPPER_JAR_URL}" "" "\${MAVEN_WRAPPER_JAR_FILE}"
  if [ $? -ne 0 ]; then
    exit 1
  fi
fi

# Set the verbose mode, if the environment variable is set.
if [ -z "\${MVNW_VERBOSE}" ]; then
  MVNW_VERBOSE="false"
fi

# At this point, the wrapper jar file should exist.
# If it does not exist, then exit.
if [ ! -f "\${MAVEN_WRAPPER_JAR_FILE}" ]; then
  printf "ERROR: The wrapper jar file '%s' does not exist.\\n" "\${MAVEN_WRAPPER_JAR_FILE}"
  exit 1
fi

# If JAVA_HOME is not set, then try to find it.
if [ -z "\${JAVA_HOME}" ]; then
  log_verbose "JAVA_HOME is not set, trying to find it..."
  # check for java in the path
  if command -v java >/dev/null 2>&1; then
    # In Linux, the readlink command is used to resolve the symlink.
    # In macOS, the greadlink command is used, because the readlink command is not compatible.
    if command -v readlink >/dev/null 2>&1 && ! readlink -f "\`command -v java\`" >/dev/null 2>&1; then
      JAVA_HOME=\`greadlink -f "\`command -v java\`" | sed "s:/bin/java::"\`
    elif command -v readlink >/dev/null 2>&1; then
      JAVA_HOME=\`readlink -f "\`command -v java\`" | sed "s:/bin/java::"\`
    else
      JAVA_HOME=\`command -v java | sed "s:/bin/java::"\`
    fi
    log_verbose "JAVA_HOME is set to '\${JAVA_HOME}'"
  else
    printf "ERROR: JAVA_HOME is not set and 'java' was not found in the PATH.\\n"
    exit 1
  fi
fi

# The exit code of the last command.
LAST_EXIT_CODE=$?
if [ \${LAST_EXIT_CODE} -ne 0 ]; then
  exit \${LAST_EXIT_CODE}
fi

run_maven "$@"
`;

export const MVNW_CMD_SCRIPT = `@rem
@rem Copyright 2012-2022 The Apache Software Foundation.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@echo off

setlocal

set MAVEN_WRAPPER_JAR_URL_SYSTEM_PROPERTY=maven.wrapper.jar.url
set MAVEN_WRAPPER_JAR_PATH_SYSTEM_PROPERTY=maven.wrapper.jar.path
set MAVEN_WRAPPER_PROPERTIES_PATH_SYSTEM_PROPERTY=maven.wrapper.properties.path
set MAVEN_WRAPPER_VERBOSE_SYSTEM_PROPERTY=maven.wrapper.verbose

rem The behavior of the script can be altered by defining the following environment variables:
rem
rem - MVNW_REPOURL - alternate Maven repository URL.
rem   This is the repository where the maven-wrapper.jar is downloaded from.
rem
rem - MVNW_VERBOSE - if set to "true", the script will be more verbose.
set MAVEN_WRAPPER_SCRIPT_DIR=%~dp0

set MAVEN_WRAPPER_PROPERTIES_FILE=%MAVEN_WRAPPER_SCRIPT_DIR%\\.mvn\\wrapper\\maven-wrapper.properties
if not exist "%MAVEN_WRAPPER_PROPERTIES_FILE%" (
  echo ERROR: The wrapper properties file '%MAVEN_WRAPPER_PROPERTIES_FILE%' does not exist.
  exit /B 1
)

set MAVEN_WRAPPER_JAR_FILE=%MAVEN_WRAPPER_SCRIPT_DIR%\\.mvn\\wrapper\\maven-wrapper.jar
if not exist "%MAVEN_WRAPPER_JAR_FILE%" (
  for /F "usebackq tokens=*" %%i in ("%MAVEN_WRAPPER_PROPERTIES_FILE%") do set WRAPPER_URL_PROPERTY=%%i
  for /F "tokens=2 delims==" %%i in ("%WRAPPER_URL_PROPERTY%") do set WRAPPER_URL=%%i

  if defined MVNW_REPOURL (
    set MAVEN_WRAPPER_JAR_URL=%MVNW_REPOURL%
  ) else (
    set MAVEN_WRAPPER_JAR_URL=%WRAPPER_URL%
  )

  echo Downloading %MAVEN_WRAPPER_JAR_URL% to %MAVEN_WRAPPER_JAR_FILE%
  powershell -Command "(New-Object Net.WebClient).DownloadFile('%MAVEN_WRAPPER_JAR_URL%', '%MAVEN_WRAPPER_JAR_FILE%')"
  if errorlevel 1 (
    echo ERROR: Cannot download '%MAVEN_WRAPPER_JAR_URL%'.
    exit /B 1
  )
)

if not defined MVNW_VERBOSE (
  set MVNW_VERBOSE=false
)

if not exist "%MAVEN_WRAPPER_JAR_FILE%" (
  echo ERROR: The wrapper jar file '%MAVEN_WRAPPER_JAR_FILE%' does not exist.
  exit /B 1
)

if not defined JAVA_HOME (
  echo ERROR: JAVA_HOME is not set.
  exit /B 1
)

"%JAVA_HOME%\\bin\\java" ^
  "-Dfile.encoding=UTF-8" ^
  %MAVEN_OPTS% ^
  -classpath "%MAVEN_WRAPPER_JAR_FILE%" ^
  "-D%MAVEN_WRAPPER_JAR_PATH_SYSTEM_PROPERTY%=%MAVEN_WRAPPER_JAR_FILE%" ^
  "-D%MAVEN_WRAPPER_PROPERTIES_PATH_SYSTEM_PROPERTY%=%MAVEN_WRAPPER_PROPERTIES_FILE%" ^
  "-D%MAVEN_WRAPPER_VERBOSE_SYSTEM_PROPERTY%=%MVNW_VERBOSE%" ^
  org.apache.maven.wrapper.MavenWrapperMain %*
`;

export const MAVEN_WRAPPER_PROPS = `wrapperUrl=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar
`;